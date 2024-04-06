import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import type { Repository } from "typeorm";

@Injectable()
export class PrivateUserConnectionRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async shouldSetupUserEnvironment(
    userId: User["id"],
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return user === null;
  }
}
