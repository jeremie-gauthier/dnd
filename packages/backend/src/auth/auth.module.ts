import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './private/auth.controller';
import { UserConnectionRepository } from './private/user-connection/user-connection.repository';
import { UserConnectionUseCase } from './private/user-connection/user-connection.uc';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [UserConnectionUseCase, UserConnectionRepository],
})
export class AuthModule {}
