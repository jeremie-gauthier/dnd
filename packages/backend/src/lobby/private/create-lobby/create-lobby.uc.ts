import { LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/database/entities/user.entity';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import { UserJoinedLobbyPayload } from 'src/lobby/events/emitters/user-joined-lobby.payload';
import { ServerSocket } from 'src/types/socket.type';
import { UseCase } from 'src/types/use-case.interface';
import { CreateLobbyInputDto } from './create-lobby.dto';
import { CreateLobbyRepository } from './create-lobby.repository';

@Injectable()
export class CreateLobbyUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: CreateLobbyRepository,
  ) {}

  public async execute({
    ctx,
    userId,
    createLobbyInputDto,
  }: {
    ctx: MessageContext;
    userId: User['id'];
    createLobbyInputDto: CreateLobbyInputDto;
  }): Promise<LobbyEntity> {
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

    this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({
        ctx,
        userId,
        lobbyId: lobby.id,
      }),
    );

    return lobby;
  }
}
