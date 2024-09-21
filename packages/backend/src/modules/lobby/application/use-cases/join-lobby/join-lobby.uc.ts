import type { JoinLobbyInput, LobbyView } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { User as RawUser } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { UserJoinedLobbyPayload } from "src/modules/shared/events/lobby/user-joined-lobby.payload";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";
import { LeaveLobbyUseCase } from "../leave-lobby/leave-lobby.uc";
import {
  USERS_REPOSITORY,
  UsersRepository,
} from "../../repositories/users-repository.interface";

@Injectable()
export class JoinLobbyUseCase implements UseCase {
  constructor(
    @Inject(LOBBIES_REPOSITORY)
    private readonly lobbiesRepository: LobbiesRepository,
    @Inject(USERS_REPOSITORY)
    protected readonly usersRepository: UsersRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly leaveLobbyUseCase: LeaveLobbyUseCase,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: { userId: RawUser["id"] } & JoinLobbyInput): Promise<LobbyView["id"]> {
    await this.leaveLobbyUseCase.execute({ userId });

    const lobby = await this.lobbiesRepository.getOneOrThrow({ lobbyId });

    lobby.join({ userId });
    await this.lobbiesRepository.update({ lobby });
    await this.usersRepository.upsert({ userId, lobbyId });

    const plainLobby = lobby.toPlain();

    this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({
        userId,
        lobby: {
          ...plainLobby,
          players: plainLobby.players.map(({ status, ...player }) => ({
            ...player,
            isReady: status,
            heroesSelected: plainLobby.playableCharacters
              .filter((pc) => pc.pickedBy === player.userId)
              .map((pc) => pc.id),
          })),
          status: plainLobby.status,
        },
      }),
    );

    return lobbyId;
  }
}
