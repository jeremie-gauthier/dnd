import { GameEntity, PlayableEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { PlayableEntityTurnEndedPayload } from "src/game/events/emitters/playable-entity-turn-ended.payload";
import { TurnService } from "src/game/timeline/services/turn/turn.service";
import { UseCase } from "src/types/use-case.interface";
import { EndPlayerTurnRepository } from "./end-player-turn.repository";

@Injectable()
export class EndPlayerTurnUseCase implements UseCase {
  constructor(
    private readonly repository: EndPlayerTurnRepository,
    private readonly turnService: TurnService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({ userId }: { userId: User["id"] }): Promise<void> {
    const game = await this.repository.getGameByUserId({ userId });

    this.assertCanEndPlayerTurn(game, { userId });

    const { playingEntity } = this.endPlayerTurn({ game });
    await this.repository.updateGame({ game });

    this.eventEmitter.emitAsync(
      GameEvent.PlayableEntityTurnEnded,
      new PlayableEntityTurnEndedPayload({
        entityId: playingEntity.id,
        game,
      }),
    );
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

  private endPlayerTurn({ game }: { game: GameEntity }): {
    playingEntity: PlayableEntity;
    nextEntityToPlay: PlayableEntity;
  } {
    const playingEntity = this.turnService.getPlayingEntity({
      game,
    }) as PlayableEntity;
    const nextEntityToPlay = this.turnService.getNextEntityToPlay({
      game,
    }) as PlayableEntity;

    // update current playable entity
    playingEntity.currentPhase = "idle";

    // update next playable entity
    nextEntityToPlay.currentPhase = "action";
    nextEntityToPlay.characteristic.actionPoints =
      nextEntityToPlay.characteristic.baseActionPoints;

    return { playingEntity, nextEntityToPlay };
  }
}
