import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { PrismaService } from 'prisma/prisma.service';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        
        private prisma : PrismaService,
        private jwtService: JwtService,
        private reflector: Reflector,

        
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization issue');
        }

        const token = authHeader.split(' ')[1];

        try{
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            })

            const id = payload.id;
            
            const user = await this.prisma.user.findUnique({where: {id}})
            
            if (!user) {
                throw new UnauthorizedException('Authorization issue')
            }

            request.user = user
            return true


            
        
              
            

            

        }catch (err) {
            throw new UnauthorizedException('Invalid or expired token')
        }
    }
}