import { type LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { DeleteLobbyPayload } from "../../emitters/delete-lobby.payload";
import { LobbyEvent } from "../../emitters/lobby-events.enum";
import { LobbyCleanerRepository } from "./lobby-cleaner.repository";

@Injectable()
export class LobbyCleanerListener {
  constructor(
    private readonly repository: LobbyCleanerRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(LobbyEvent.UserLeftLobby)
  @OnEvent(LobbyEvent.UserForceLeftLobby)
  public async handler({ lobby }: { lobby: LobbyEntity }) {
    const hasNoPlayersLeft = lobby.players.length === 0;
    if (hasNoPlayersLeft) {
      await this.repository.delLobbyById(lobby.id);

      this.eventEmitter.emitAsync(
        LobbyEvent.DeleteLobby,
        new DeleteLobbyPayload({ lobby }),
      );

      if (
        lobby.status === "GAME_INITIALIZING" ||
        lobby.status === "GAME_STARTED"
      ) {
        await this.repository.delGameById({ gameId: lobby.id });
      }
    }
  }
}
