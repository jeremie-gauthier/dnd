import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import type { DeepPartial, Repository } from "typeorm";

@Injectable()
export class UserConnectionRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public getUser({ userId }: { userId: User["id"] }): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  public async createNewUser(user: DeepPartial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }
}
