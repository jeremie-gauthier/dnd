import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/database/entities/user.entity';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import { UserJoinedLobbyPayload } from 'src/lobby/events/emitters/user-joined-lobby.payload';
import { UseCase } from 'src/types/use-case.interface';
import { JoinLobbyInputDto } from './join-lobby.dto';
import { JoinLobbyRepository } from './join-lobby.repository';

@Injectable()
export class JoinLobbyUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: JoinLobbyRepository,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: { userId: User['id'] } & JoinLobbyInputDto): Promise<LobbyEntity['id']> {
    const lobby = await this.repository.getLobbyById(lobbyId);
    this.assertsCanEnterLobby(userId, lobby);

    await this.repository.addPlayerToLobby({
      player: {
        userId,
        heroesSelected: [],
      },
      lobbyId,
    });

    this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({
        userId,
        lobbyId,
      }),
    );

    return lobby.id;
  }

  private assertsCanEnterLobby(
    userId: User['id'],
    lobby: LobbyEntity | null,
  ): asserts lobby is LobbyEntity {
    if (!lobby) {
      throw new Error('Lobby not found');
    }

    if (lobby.players.length >= lobby.config.nbPlayersMax) {
      throw new Error('No space left in this lobby');
    }

    if (lobby.players.some((player) => player.userId === userId)) {
      throw new Error('You are already in this lobby');
    }
  }
}
