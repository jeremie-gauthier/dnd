import { GameEntity, PlayableEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { TurnService } from "../services/turn/turn.service";
import { EndPlayerTurnRepository } from "./end-player-turn.repository";

@Injectable()
export class EndPlayerTurnUseCase implements UseCase {
  constructor(
    private readonly repository: EndPlayerTurnRepository,
    private readonly turnService: TurnService,
    private readonly backupService: BackupService,
  ) {}

  public async execute({ userId }: { userId: User["id"] }): Promise<void> {
    const game = await this.repository.getGameByUserId({ userId });

    this.assertCanEndPlayerTurn(game, { userId });

    this.endPlayerTurn({ game });
    await this.backupService.updateGame({ game });
  }

  private assertCanEndPlayerTurn(
    game: GameEntity | null,
    { userId }: { userId: User["id"] },
  ): asserts game is GameEntity {
    if (!game) {
      throw new NotFoundException("Game not found");
    }

    const playableEntities = Object.values(game.playableEntities);
    if (
      playableEntities.every(({ playedByUserId }) => playedByUserId !== userId)
    ) {
      throw new ForbiddenException("User does not play in this lobby");
    }

    const playingEntity = playableEntities.find(
      ({ currentPhase }) => currentPhase === "action",
    );
    if (!playingEntity || playingEntity.playedByUserId !== userId) {
      throw new ForbiddenException(
        "User has no playable entity in action phase",
      );
    }
  }

  private endPlayerTurn({ game }: { game: GameEntity }) {
    const playingEntity = this.turnService.getPlayingEntity({
      game,
    }) as PlayableEntity;
    const nextEntityToPlay = this.turnService.getNextEntityToPlay({
      game,
    }) as PlayableEntity;

    this.turnService.endPlayableEntityTurn({
      game,
      playableEntity: playingEntity,
    });
    this.turnService.startPlayableEntityTurn({
      game,
      playableEntity: nextEntityToPlay,
    });
  }
}
