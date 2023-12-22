import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserStatus } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewUserRegisteredRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createNewUser(userId: User['id']): Promise<User> {
    const newUser = this.userRepository.create({
      id: userId,
      status: UserStatus.CREATED,
    });

    return await this.userRepository.save(newUser);
  }
}