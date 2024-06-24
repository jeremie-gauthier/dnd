import { EndPlayerTurnInput, GameEntity, PlayableEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { BackupService } from "../../../domain/backup/backup.service";
import { PlayableEntityService } from "../../../domain/playable-entity/playable-entity.service";
import { TurnService } from "../../../domain/turn/turn.service";

@Injectable()
export class EndPlayerTurnUseCase implements UseCase {
  constructor(
    private readonly turnService: TurnService,
    private readonly backupService: BackupService,
    private readonly playableEntityService: PlayableEntityService,
  ) {}

  public async execute({
    gameId,
    userId,
  }: EndPlayerTurnInput & { userId: User["id"] }): Promise<void> {
    const game = await this.backupService.getGameOrThrow({ gameId });

    this.mustExecute({ game, userId });

    this.endPlayerTurn({ game });
    await this.backupService.updateGame({ game });
  }

  private mustExecute({
    game,
    userId,
  }: { game: GameEntity; userId: User["id"] }) {
    const playableEntities = Object.values(game.playableEntities);
    if (
      playableEntities.every(({ playedByUserId }) => playedByUserId !== userId)
    ) {
      throw new ForbiddenException("User does not play in this lobby");
    }

    const playingEntity = playableEntities.find(
      ({ currentPhase }) => currentPhase === "action",
    );
    if (!playingEntity) {
      throw new NotFoundException("Playable entity not found in this game");
    }

    this.playableEntityService.mustBeInActionPhase(playingEntity);
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
