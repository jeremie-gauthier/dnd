import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UsersRepository } from "src/redis/repositories/users.repository";

@Injectable()
export class JoinLobbyRepository {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async getUserLobby({ userId }: { userId: User["id"] }) {
    return await this.usersRepository.get(userId);
  }
}
