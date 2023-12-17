import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserConnectionRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async shouldSetupUserEnvironment(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return user === null;
  }
}
