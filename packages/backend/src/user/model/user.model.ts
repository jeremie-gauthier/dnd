import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModel } from 'src/database/model.abstract';
import { User } from '../types/user.type';

@Injectable()
export class UserModel extends DatabaseModel<User> {
  constructor(dbService: DatabaseService) {
    super(dbService, 'user');
  }

  public async create(user: Partial<User>) {
    const newUser = await this.dbService.exec(
      this.table.insert(user as User, { returnChanges: true }),
    );
    return newUser.changes![0]?.new_val;
  }
}
