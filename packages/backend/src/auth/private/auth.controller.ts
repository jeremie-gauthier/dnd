import { Controller, Post } from '@nestjs/common';
import { User, UserFromJWT } from '../user.decorator';
import { UserConnectionUseCase } from './user-connection/user-connection.uc';

@Controller('auth')
export class AuthController {
  constructor(private readonly userConnectionUseCase: UserConnectionUseCase) {}

  @Post('connection')
  public async connection(@User() user: UserFromJWT) {
    console.log(user.id);
    await this.userConnectionUseCase.execute({ userId: user.id });
    return 'Ok';
  }
}
