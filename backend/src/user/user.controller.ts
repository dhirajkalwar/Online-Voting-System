import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Req() req : Request, @Res() res : Response){
    return this.userService.profile(req , res)
  }

  @Get('election')
  @UseGuards(AuthGuard)
  async findElection(@Req() req : Request, @Res() res : Response){
    return this.userService.findElection(req, res)
  }

  @Get('voterDetail')
  @UseGuards(AuthGuard)
  async findCandidate(@Req() req : Request, @Res() res : Response){
    return this.userService.findCandidate(req, res)
  }

  @Get('vote/:id')
  @UseGuards(AuthGuard)
  async vote(@Req() req : Request, @Res() res : Response, @Param('id') id: Number) {
    this.userService.vote(req, res, id)
  }

  @Get('isVoted')
  @UseGuards(AuthGuard)
  async isEligible(@Req() req : Request, @Res() res : Response) {
    this.userService.isEligible(req, res)
  }

  @Get('result')
  @UseGuards(AuthGuard)
  async result(@Req() req : Request, @Res() res : Response) {
    this.userService.result(req, res)
  }
}
