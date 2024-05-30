import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { GameUpdatedPayload } from "src/game/events/emitters/game-updated.payload";
import { BackupRepository } from "./backup.repository";

@Injectable()
export class BackupService {
  constructor(
    private readonly repository: BackupRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async updateGame({ game }: { game: GameEntity }): Promise<void> {
    await this.repository.updateGame({ game });

    this.eventEmitter.emitAsync(
      GameEvent.GameUpdated,
      new GameUpdatedPayload({ game }),
    );
  }
}
