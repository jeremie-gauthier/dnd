import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { NewUserRegisteredListener } from './events/new-user-registered/new-user-registered.listener';
import { NewUserRegisteredRepository } from './events/new-user-registered/new-user-registered.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Campaign])],
  providers: [NewUserRegisteredListener, NewUserRegisteredRepository],
})
export class UserModule {}
