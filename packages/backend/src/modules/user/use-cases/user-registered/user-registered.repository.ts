import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { DeepPartial, Repository } from "typeorm";
import { User } from "../../infra/database/entities/user.entity";

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
