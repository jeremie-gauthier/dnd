import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class TrackUserAccrossLobbiesRepository {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly redis: Cache,
  ) {}

  public async saveUserLobby({ userId, lobbyId }: { userId: User['id']; lobbyId: string }) {
    const userKey = this.getUserKey(userId);
    await this.redis.set(userKey, lobbyId);
  }

  private getUserKey(userId: User['id']): string {
    return `user:${userId}`;
  }
}
