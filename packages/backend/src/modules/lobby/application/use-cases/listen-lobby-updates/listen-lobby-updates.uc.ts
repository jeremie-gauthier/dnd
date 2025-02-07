import { ListenLobbyChangesInput } from "@dnd/shared";
import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { ServerSocket } from "src/interfaces/socket.interface";
import type { UseCase } from "src/interfaces/use-case.interface";
import { LobbyUpdatedPayload } from "src/modules/shared/events/lobby/lobby-changed.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import {
  LOBBY_REPOSITORY,
  LobbyRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class ListenLobbyUpdatesUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(LOBBY_REPOSITORY)
    private readonly lobbiesRepository: LobbyRepository,
  ) {}

  public async execute({
    client,
    lobbyId,
  }: ListenLobbyChangesInput & { client: ServerSocket }): Promise<void> {
    const lobby = await this.lobbiesRepository.getOneOrThrow({ lobbyId });
    const user = lobby.findUser({ userId: client.data.userId });
    if (!user) {
      throw new ForbiddenException("User does not belong to this lobby");
    }

    await client.join(lobbyId);
    await this.lobbiesRepository.getOneOrThrow({ lobbyId });

    // ? no update, but it's an easy way to trigger a ws publish for the new user
    const plainLobby = lobby.toPlain();
    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyUpdated,
      new LobbyUpdatedPayload({
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
