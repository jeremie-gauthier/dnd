import { LobbyEntity } from '@dnd/shared';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CreateLobbyRepository {
  private static CACHE_EXPIRATION_DISABLED = 0;

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly redis: Cache,
  ) {}

  public async createLobby(lobby: Omit<LobbyEntity, 'id'>): Promise<LobbyEntity> {
    const lobbyId = this.getRandomLobbyId();
    const newLobby = { id: lobbyId, ...lobby };

    await this.redis.set(lobbyId, newLobby, CreateLobbyRepository.CACHE_EXPIRATION_DISABLED);

    return newLobby;
  }

  private getRandomLobbyId(): string {
    const randomId = randomUUID();
    return `lobby:${randomId}`;
  }
}
