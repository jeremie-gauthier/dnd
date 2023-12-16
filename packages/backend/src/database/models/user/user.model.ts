import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from '../model.abstract';
import { User } from './user.type';

@Injectable()
export class UserModel extends DatabaseModel<User> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'user');
  }
}
