import { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { LobbyUpdatedPayload } from "src/lobby/events/emitters/lobby-changed.payload";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import { BackupRepository } from "./backup.repository";

@Injectable()
export class BackupService {
  constructor(
    private readonly repository: BackupRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async updateLobby({ lobby }: { lobby: LobbyEntity }): Promise<void> {
    await this.repository.updateLobby({ lobby });

    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyUpdated,
      new LobbyUpdatedPayload({ lobby }),
    );
  }
}
