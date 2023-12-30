import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthzModule } from 'src/authz/authz.module';
import { User } from 'src/database/entities/user.entity';
import { AuthPrivateController } from './private/auth.controller';
import { UserConnectionRepository } from './private/user-connection/user-connection.repository';
import { UserConnectionUseCase } from './private/user-connection/user-connection.uc';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), AuthzModule],
  controllers: [AuthPrivateController],
  providers: [UserConnectionUseCase, UserConnectionRepository],
})
export class AuthModule {}
