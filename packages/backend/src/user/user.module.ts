import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { NewUserRegisteredListener } from './events/new-user-registered/new-user-registered.listener';
import { NewUserRegisteredRepository } from './events/new-user-registered/new-user-registered.repository';

@Module({
  imports: [DatabaseModule],
  providers: [NewUserRegisteredListener, NewUserRegisteredRepository],
})
export class UserModule {}
