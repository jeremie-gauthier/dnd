import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { UserStatus } from "src/database/enums/user-status.enum";
import type { Repository } from "typeorm";

@Injectable()
export class NewUserRegisteredRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createNewUser({
    userId,
    avatarUrl,
    username,
  }: {
    userId: User["id"];
    avatarUrl: string;
    username: string;
  }): Promise<User> {
    const newUser = this.userRepository.create({
      id: userId,
      status: UserStatus.CREATED,
      avatarUrl,
      username,
    });

    return await this.userRepository.save(newUser);
  }
}
