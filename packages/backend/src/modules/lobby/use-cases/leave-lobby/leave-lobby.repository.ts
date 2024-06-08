import { Injectable } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UsersRepository } from "src/redis/repositories/users.repository";

@Injectable()
export class LeaveLobbyRepository {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async getUserLobby({
    userId,
  }: { userId: User["id"] }): Promise<string | undefined> {
    return await this.usersRepository.get(userId);
  }
}
