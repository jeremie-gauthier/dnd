import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CreateLobbyRepository {
  constructor(@Inject(CACHE_MANAGER) private redis: Cache) {}

  public async createLobby() {
    // await this.redis.set();
  }
}
