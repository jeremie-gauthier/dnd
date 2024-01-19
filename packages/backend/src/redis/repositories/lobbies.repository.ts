import { LobbyEntity } from '@dnd/shared';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { RedisService } from '../redis.service';

type LobbiesKey = Record<LobbyEntity['id'], LobbyEntity>;

@Injectable()
export class LobbiesRepository implements OnApplicationBootstrap {
  public readonly client;
  public static KEY = 'lobbies';

  constructor(redisService: RedisService) {
    this.client = redisService.client;
  }

  public async onApplicationBootstrap() {
    const lobbies = await this.client.json.get(LobbiesRepository.KEY);
    if (lobbies === null) {
      await this.client.json.set(LobbiesRepository.KEY, RedisService.JSON_ROOT, {});
    }
  }

  public async getMany(): Promise<LobbyEntity[]> {
    const lobbies = (await this.client.json.get(LobbiesRepository.KEY)) as LobbiesKey;
    return Object.values(lobbies);
  }

  public async getOne(path: string | string[]): Promise<LobbyEntity | null> {
    return (await this.client.json.get(LobbiesRepository.KEY, {
      path,
    })) as LobbyEntity | null;
  }

  public async set(lobby: Omit<LobbyEntity, 'id'>): Promise<LobbyEntity> {
    const lobbyId = this.getRandomLobbyId();
    const newLobby: LobbyEntity = { id: lobbyId, ...lobby };

    await this.client.json.set(LobbiesRepository.KEY, lobbyId, newLobby);

    return newLobby;
  }

  public async update(updatedLobby: LobbyEntity): Promise<void> {
    await this.client.json.set(LobbiesRepository.KEY, updatedLobby.id, updatedLobby);
  }

  public async del(lobbyId: LobbyEntity['id']): Promise<void> {
    await this.client.json.del(LobbiesRepository.KEY, lobbyId);
  }

  private getRandomLobbyId(): string {
    const randomId = randomUUID();
    return randomId;
  }
}
