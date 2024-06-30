import { GameEntity } from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { BackupRepository } from "./backup.repository";

@Injectable()
export class BackupService {
  constructor(
    private readonly repository: BackupRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async getGameOrThrow({
    gameId,
  }: { gameId: GameEntity["id"] }): Promise<GameEntity> {
    const game = await this.repository.getGame({ gameId });
    if (!game) {
      throw new NotFoundException("Game not found");
    }
    return game;
  }

  public async updateGame({ game }: { game: GameEntity }): Promise<void> {
    await this.repository.updateGame({ game });

    // this.eventEmitter.emitAsync(
    //   GameEvent.GameUpdated,
    //   new GameUpdatedPayload({ game }),
    // );
  }
}
