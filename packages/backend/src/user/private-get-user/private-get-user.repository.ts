import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class PrivateGetUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public getUserById(userId: User["id"]): Promise<User> {
    return this.userRepository.findOneOrFail({
      select: {
        id: true,
        avatarUrl: true,
        username: true,
      },
      where: {
        id: userId,
      },
    });
  }
}
