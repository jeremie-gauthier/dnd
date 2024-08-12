import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { LobbyDeletedPayload } from "src/modules/shared/events/lobby/lobby-deleted.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import { UserLeftLobbyPayload } from "src/modules/shared/events/lobby/user-left-lobby.payload";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";
import {
  USERS_REPOSITORY,
  UsersRepository,
} from "../../repositories/users-repository.interface";

@Injectable()
export class LeaveLobbyUseCase implements UseCase {
  constructor(
    @Inject(LOBBIES_REPOSITORY)
    private readonly lobbiesRepository: LobbiesRepository,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    userId,
  }: { userId: User["id"] }): Promise<string | undefined> {
    const lobbyId = await this.usersRepository.getOne({ userId });
    if (!lobbyId) {
      return;
    }

    const lobby = await this.lobbiesRepository.getOne({
      lobbyId: lobbyId,
    });
    if (!lobby) {
      return;
    }

    const userThatLeave = lobby.findUser({ userId });
    if (!userThatLeave) {
      return;
    }

    lobby.leave({ user: userThatLeave });
    await this.usersRepository.del({ userId });

    const plainLobby = lobby.toPlain();
    this.eventEmitter.emitAsync(
      LobbyEvent.UserLeftLobby,
      new UserLeftLobbyPayload({
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

    const hasNoPlayersLeft = plainLobby.players.length === 0;
    const hasHostLeft = plainLobby.host.userId === userId;
    const shouldDeleteLobby = hasNoPlayersLeft || hasHostLeft;

    if (shouldDeleteLobby) {
      await this.deleteLobby({ lobby });
    } else {
      await this.lobbiesRepository.update({ lobby });
    }

    return lobby.id;
  }

  private async deleteLobby({ lobby }: { lobby: Lobby }) {
    const plainLobby = lobby.toPlain();
    for (const { userId } of plainLobby.players) {
      this.eventEmitter.emitAsync(
        LobbyEvent.UserLeftLobby,
        new UserLeftLobbyPayload({
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
    }

    await this.lobbiesRepository.del({ lobbyId: lobby.id });

    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyDeleted,
      new LobbyDeletedPayload({
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
  }
}
