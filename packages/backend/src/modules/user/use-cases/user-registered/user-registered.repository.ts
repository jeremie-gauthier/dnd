import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import type { DeepPartial, Repository } from "typeorm";

@Injectable()
export class UserRegisteredRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createNewUser(user: DeepPartial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }
}
