import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserModel } from './model/user.model';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserModel, UserService],
  exports: [UserService],
})
export class UserModule {}
