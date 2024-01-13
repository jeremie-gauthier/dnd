import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { LobbiesRepository } from 'src/redis/repositories/lobbies.repository';

@Injectable()
export class CreateLobbyRepository {
  constructor(private readonly lobbiesRepository: LobbiesRepository) {}

  public async createLobby(lobby: Omit<LobbyEntity, 'id'>): Promise<LobbyEntity> {
    return await this.lobbiesRepository.set(lobby);
  }
}
