import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma : PrismaService
    ){}

   async profile(req , res){

        const { id, name, email,mobileNo,age,voterId, aadhaarNo } = req.user;
        return res.send({
            id:id,
            email,
            name,
            mobileNo,
            age,
            voterId,
            aadhaarNo
        })
    }

    async findElection(req, res){
        const find = await this.prisma.election.findMany({})

        const sortedData = find.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return res.send(sortedData)
        
        
    }

    async findCandidate(req, res){
        const find = await this.prisma.candidate.findMany({})

        const sortedData = find.sort((a, b) => a.id - b.id );

        return res.send(sortedData)
    }

    async vote(req, res, id) {

        
        id = Number(id)
        const update = await this.prisma.candidate.update({
            where : { id : id},
            data : {
                voteCount : {
                    increment : 1
                }
            }
        })

        if(!update) {
            throw new BadRequestException("Server Issue")
        }

        const updateUser = await this.prisma.user.update({
            where : {id : req.user.id},
            data : {
                isVoted : true
            }
        })

        if(!updateUser) {
            throw new BadRequestException("Server Issue")
        }

        return res.send("Voted Successfullu")
        
        
    }

    async isEligible(req, res) {
        if (req.user.isVoted == false) {
            return res.send(true)
        }

        return res.send(false)
    }

    async result(req, res) {
        const find = await this.prisma.candidate.findMany({})
        if(!find) {
            throw new BadRequestException("Server Issue")
        }

        const sortedData = find.sort((a, b) => a.voteCount - b.voteCount );
        const list = sortedData.reverse();

        return res.send(list)
        



    }
}
