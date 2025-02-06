import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../infra/database/entities/user.entity";

@Injectable()
export class GetUserRepository {
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
