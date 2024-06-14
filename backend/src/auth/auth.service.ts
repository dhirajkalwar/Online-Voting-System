import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor (private prisma: PrismaService,
        private jwtService : JwtService
    ) {}

    async signup(dto : AuthDto) {
        const { name, email, mobileNo, aadhaarNo,  password } = dto
        console.log(dto);
        
        const find = await this.prisma.user.findUnique({where : {email}})

        if(find) {
            throw new BadRequestException('Email Already Exists')
        }

        const voterNo = await this.genrateVoterId()
        const voterId = String(voterNo)

        const hpassword = await this.hashedPassword(password);

        await this.prisma.user.create({
            data: {
                name,
                email,
                mobileNo,
                aadhaarNo,
                age:18,
                voterId,
                password:hpassword,
            }
        })

        return { voterId }
    }

    async signin(dto : SignInDto, req, res) {
        const { voterId, password } = dto;

        const find = await this.prisma.user.findUnique({where : {voterId}})

        if(!find) {
            throw new BadRequestException('Invalid Email Or Password')
        }

        const isMatch = await bcrypt.compare(password, find.password);
        if(!isMatch) {
            throw new BadRequestException('Invalid Email Or Password')
        }

        const token = this.jwtService.sign({id:find.id},{secret: process.env.JWT_SECRET})
        console.log(token);
        

        res.cookie('token', token,{
            secure: false, // Set to true if using https
        })
        
        
        return res.send({token})
    }

    async signout(req : Request , res : Response) {
        res.clearCookie('token')
        return 'sign out'
    }

    async hashedPassword(password) {
        const salt = 10

        const hpassword = await bcrypt.hash(password, salt)
        return hpassword
    }

    async genrateVoterId() {

        const min = 1000000000; 
        const max = 9999999999; 
        let voterId = String(Math.floor(Math.random() * (max - min + 1)) + min);
        const find = await this.prisma.user.findUnique({where:{voterId}})
        if(find) {
            return String(Number(voterId) + 1)
        }
        return voterId
    }
    
}
