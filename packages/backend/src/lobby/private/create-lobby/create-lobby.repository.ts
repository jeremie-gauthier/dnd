import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { REDIS_LOBBIES_KEY } from 'src/lobby/constants';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CreateLobbyRepository {
  constructor(private readonly redis: RedisService) {}

  public async createLobby(lobby: Omit<LobbyEntity, 'id'>): Promise<LobbyEntity> {
    const lobbyId = this.getRandomLobbyId();
    const newLobby = { id: lobbyId, ...lobby };

    await this.redis.client.json.arrAppend(REDIS_LOBBIES_KEY, RedisService.JSON_ROOT, newLobby);

    return newLobby;
  }

  private getRandomLobbyId(): string {
    const randomId = randomUUID();
    return randomId;
  }
}
