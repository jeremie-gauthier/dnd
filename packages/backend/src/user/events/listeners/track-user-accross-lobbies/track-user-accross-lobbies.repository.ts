import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { RedisService } from 'src/redis/redis.service';
import { REDIS_USERS_KEY } from 'src/user/constants';

@Injectable()
export class TrackUserAccrossLobbiesRepository {
  constructor(private readonly redis: RedisService) {}

  public async saveUserLobby({ userId, lobbyId }: { userId: User['id']; lobbyId: string }) {
    await this.redis.client.hSet(REDIS_USERS_KEY, userId, lobbyId);
  }
}
