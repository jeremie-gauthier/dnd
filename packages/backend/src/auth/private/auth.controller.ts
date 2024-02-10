import { Controller, Get, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JWTAuthGuard } from 'src/authz/jwt-auth.guard';
import { JWTUser } from 'src/authz/jwt-user.decorator';
import { UserConnectionUseCase } from './user-connection/user-connection.uc';

@UseGuards(JWTAuthGuard)
@Controller('auth/private')
export class AuthPrivateController {
  constructor(private readonly userConnectionUseCase: UserConnectionUseCase) {}

  @Get('connection')
  public async connection(@JWTUser() user: Request['user']) {
    await this.userConnectionUseCase.execute({ userId: user.id });
    return 'Ok';
  }

  @Get()
  public async identity(@JWTUser() user: Request['user']) {
    console.log('http identity', user);
    return { ...user };
  }
}
