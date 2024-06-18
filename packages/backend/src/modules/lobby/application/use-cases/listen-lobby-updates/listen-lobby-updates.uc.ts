import { ListenLobbyChangesInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { ServerSocket } from "src/interfaces/socket.interface";
import type { UseCase } from "src/interfaces/use-case.interface";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { LobbyUpdatedPayload } from "src/modules/shared/events/lobby/lobby-changed.payload";
import { LobbyEvent } from "src/modules/shared/events/lobby/lobby-event.enum";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";

@Injectable()
export class ListenLobbyUpdatesUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(LOBBIES_REPOSITORY)
    private readonly lobbiesRepository: LobbiesRepository,
  ) {}

  public async execute({
    client,
    lobbyId,
  }: ListenLobbyChangesInput & { client: ServerSocket }): Promise<void> {
    const userId = new UniqueId(client.data.userId);

    const lobby = await this.lobbiesRepository.getDomainOneOrThrow({
      lobbyId: new UniqueId(lobbyId),
    });
    lobby.players.findOrThrow({ id: userId });

    await client.join(lobbyId);

    const lobbyView = await this.lobbiesRepository.getViewOneOrThrow({
      lobbyId,
    });
    // ? no update, but it's an easy way to trigger a ws publish for the new user
    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyUpdated,
      new LobbyUpdatedPayload({
        lobby: lobbyView,
      }),
    );
  }
}
