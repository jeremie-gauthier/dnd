import type { JoinLobbyInput, LobbyView } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { User as RawUser } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { UserJoinedLobbyPayload } from "src/modules/shared/events/lobby/user-joined-lobby.payload";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";
import { USERS_REPOSITORY } from "../../repositories/users-repository.interface";
import { LeaveLobbyUseCase } from "../leave-lobby/leave-lobby.uc";

@Injectable()
export class JoinLobbyUseCase implements UseCase {
  constructor(
    @Inject(LOBBIES_REPOSITORY)
    private readonly lobbiesRepository: LobbiesRepository,
    @Inject(USERS_REPOSITORY)
    private readonly eventEmitter: EventEmitter2,
    private readonly leaveLobbyUseCase: LeaveLobbyUseCase,
  ) {}

  public async execute({
    userId: rawUserId,
    lobbyId,
  }: { userId: RawUser["id"] } & JoinLobbyInput): Promise<LobbyView["id"]> {
    await this.leaveLobbyUseCase.execute({ userId: rawUserId });

    const lobby = await this.lobbiesRepository.getOneOrThrow({
      lobbyId: new UniqueId(lobbyId),
    });

    const userId = new UniqueId(rawUserId);
    lobby.join({ userId });
    await this.lobbiesRepository.update({ lobby });

    const lobbyView = await this.lobbiesRepository.getOneOrThrow({
      lobbyId: new UniqueId(lobbyId),
    });
    this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({
        userId: rawUserId,
        lobby: lobby.toPlain(),
      }),
    );

    return lobbyId;
  }
}
