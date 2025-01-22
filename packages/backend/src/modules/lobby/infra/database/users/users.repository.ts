import { Injectable } from "@nestjs/common";
import { RedisService } from "../../../../../redis/redis.service";
import { UsersRepository } from "../../../application/repositories/users-repository.interface";
import { Lobby } from "../../../domain/lobby/lobby.aggregate";
import { User } from "../../../domain/user/user.entity";

@Injectable()
export class RedisUsersRepository implements UsersRepository {
  public readonly client;
  public static readonly KEY = "users";

  constructor(redisService: RedisService) {
    this.client = redisService.client;
  }

  public async upsert({
    userId,
    lobbyId,
  }: {
    userId: User["id"];
    lobbyId: Lobby["id"];
  }): Promise<void> {
    await this.client.hSet(RedisUsersRepository.KEY, userId, lobbyId);
  }

  public async getOne({
    userId,
  }: { userId: User["id"] }): Promise<Lobby["id"] | undefined> {
    const lobbyId = await this.client.hGet(RedisUsersRepository.KEY, userId);
    if (lobbyId) {
      return lobbyId;
    }
  }

  public async del({ userId }: { userId: User["id"] }): Promise<void> {
    await this.client.hDel(RedisUsersRepository.KEY, userId);
  }
}
