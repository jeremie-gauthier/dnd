import { Controller, Post } from '@nestjs/common';
import { JWTUser, UserFromJWT } from '../jwt-user.decorator';
import { UserConnectionUseCase } from './user-connection/user-connection.uc';

@Controller('auth/private')
export class AuthPrivateController {
  constructor(private readonly userConnectionUseCase: UserConnectionUseCase) {}

  @Post('connection')
  public async connection(@JWTUser() user: UserFromJWT) {
    await this.userConnectionUseCase.execute({ userId: user.id });
    return 'Ok';
  }
}
