import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import { RedisService } from "../../../../redis/redis.service";

type UsersKey = Record<User["id"], LobbyEntity["id"]>;

@Injectable()
export class UsersRepository {
  public readonly client;
  public static KEY = "users";

  constructor(redisService: RedisService) {
    this.client = redisService.client;
  }

  public async set({
    userId,
    lobbyId,
  }: {
    userId: User["id"];
    lobbyId: LobbyEntity["id"];
  }): Promise<void> {
    await this.client.hSet(UsersRepository.KEY, userId, lobbyId);
  }

  public async del(userId: User["id"]): Promise<void> {
    await this.client.hDel(UsersRepository.KEY, userId);
  }

  public async get(userId: User["id"]): Promise<LobbyEntity["id"] | undefined> {
    return await this.client.hGet(UsersRepository.KEY, userId);
  }
}
