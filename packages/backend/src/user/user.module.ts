import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { NewUserRegisteredListener } from './events/listeners/new-user-registered/new-user-registered.listener';
import { NewUserRegisteredRepository } from './events/listeners/new-user-registered/new-user-registered.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [NewUserRegisteredListener, NewUserRegisteredRepository],
})
export class UserModule {}
