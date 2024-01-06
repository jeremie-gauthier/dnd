import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/database/entities/user.entity';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import { UserJoinedLobbyPayload } from 'src/lobby/events/emitters/user-joined-lobby.payload';
import { UseCase } from 'src/types/use-case.interface';
import { CreateLobbyInputDto } from './create-lobby.dto';
import { CreateLobbyRepository } from './create-lobby.repository';

@Injectable()
export class CreateLobbyUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: CreateLobbyRepository,
  ) {}

  public async execute(
    userId: User['id'],
    createLobbyInputDto: CreateLobbyInputDto,
  ): Promise<LobbyEntity> {
    // TODO: fetch all available heroes for this campaign (via stageId) and put their ID in newLobby.heroesAvailable

    const lobby = await this.repository.createLobby({
      host: {
        userId,
      },
      config: createLobbyInputDto,
      players: [
        {
          userId,
          heroesSelected: [],
        },
      ],
      heroesAvailable: [],
    });

    // TODO: in the same time, emit "new-lobby" to all connected sockets
    // ? tweak UserJoinedLobby event to also add the user in the players array ?
    // ? or split in two events: UserJoinLobby (the intent) and UserJoinedLobby (action done) ?
    await this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({
        userId,
        lobbyId: lobby.id,
      }),
    );

    return lobby;
  }
}
