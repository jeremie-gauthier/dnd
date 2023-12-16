import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/database/models/user/user.model';

@Injectable()
export class UserConnectionRepository {
  constructor(private readonly userModel: UserModel) {}

  public async shouldSetupUserEnvironment(userId: string): Promise<boolean> {
    const user = await this.userModel.exec(this.userModel.table.get(userId));
    return user === null;
  }
}
