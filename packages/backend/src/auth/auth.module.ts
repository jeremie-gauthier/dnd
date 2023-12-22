import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { AuthPrivateController } from './private/auth.controller';
import { UserConnectionRepository } from './private/user-connection/user-connection.repository';
import { UserConnectionUseCase } from './private/user-connection/user-connection.uc';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthPrivateController],
  providers: [UserConnectionUseCase, UserConnectionRepository],
})
export class AuthModule {}
