import { LobbyEntity } from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { LobbyUpdatedPayload } from "src/lobby/events/emitters/lobby-changed.payload";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-event.enum";
import { BackupRepository } from "./backup.repository";

@Injectable()
export class BackupService {
  constructor(
    private readonly repository: BackupRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async getLobbyOrThrow({
    lobbyId,
  }: { lobbyId: LobbyEntity["id"] }): Promise<LobbyEntity> {
    const lobby = await this.repository.getLobby({ lobbyId });
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }
    return lobby;
  }

  public async updateLobby({ lobby }: { lobby: LobbyEntity }): Promise<void> {
    await this.repository.updateLobby({ lobby });

    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyUpdated,
      new LobbyUpdatedPayload({ lobby }),
    );
  }
}
