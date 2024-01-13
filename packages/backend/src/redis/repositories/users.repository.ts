import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { RedisService } from '../redis.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UsersKey = Record<User['id'], LobbyEntity['id']>;

@Injectable()
export class UsersRepository {
  public readonly client;
  public static KEY = 'users';

  constructor(redisService: RedisService) {
    this.client = redisService.client;
  }

  public async set({
    userId,
    lobbyId,
  }: {
    userId: User['id'];
    lobbyId: LobbyEntity['id'];
  }): Promise<void> {
    await this.client.hSet(UsersRepository.KEY, userId, lobbyId);
  }
}
