import type { JoinLobbyInput, LobbyView } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { UseCase } from "src/interfaces/use-case.interface";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { UserJoinedLobbyPayload } from "src/modules/shared/events/lobby/user-joined-lobby.payload";
import { User } from "src/modules/user/infra/database/entities/user.entity";
import {
  LOBBY_REPOSITORY,
  LobbyRepository,
} from "../../repositories/lobbies-repository.interface";
import { LeaveLobbyUseCase } from "../leave-lobby/leave-lobby.uc";

@Injectable()
export class JoinLobbyUseCase implements UseCase {
  constructor(
    @Inject(LOBBY_REPOSITORY)
    private readonly lobbiesRepository: LobbyRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly leaveLobbyUseCase: LeaveLobbyUseCase,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: { userId: User["id"] } & JoinLobbyInput): Promise<LobbyView["id"]> {
    await this.leaveLobbyUseCase.execute({ userId });

    const lobby = await this.lobbiesRepository.getOneOrThrow({ lobbyId });

    lobby.join({ userId });
    await this.lobbiesRepository.update({ lobby });

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
