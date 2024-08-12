import { PlayableEntityAttackInput } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { EntityAttackedPayload } from "src/modules/shared/events/game/entity-attacked.payload";
import { EntityDiedPayload } from "src/modules/shared/events/game/entity-died.payload";
import { EntityTookDamagePayload } from "src/modules/shared/events/game/entity-took-damage.payload";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameUpdatedPayload } from "src/modules/shared/events/game/game-updated.payload";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";

@Injectable()
export class PlayableEntityAttackUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    gameId,
    attackId,
    targetPlayableEntityId,
    userId,
  }: PlayableEntityAttackInput & { userId: User["id"] }): Promise<void> {
    const game = await this.gameRepository.getOneOrThrow({ gameId });

    const { attack, attacker, attackItem, attackResult, damageDone, target } =
      game.playerAttack({
        attackId,
        targetPlayableEntityId,
        userId,
      });

    await this.gameRepository.update({ game });

    const plainGame = game.toPlain();
    const plainTarget = target.toPlain();

    await this.eventEmitter.emitAsync(
      GameEvent.GameUpdated,
      new GameUpdatedPayload({ game: plainGame }),
    );

    await this.eventEmitter.emitAsync(
      GameEvent.EntityAttacked,
      new EntityAttackedPayload({
        game: plainGame,
        attacker: attacker.toPlain(),
        target: plainTarget,
        damageDone: attackResult.attackResult.sumResult,
        dicesResults: attackResult.attackResult.dicesResults,
        attack: attack.toPlain(),
        attackItemUsed: attackItem.toPlain(),
      }),
    );

    await this.eventEmitter.emitAsync(
      GameEvent.EntityTookDamage,
      new EntityTookDamagePayload({
        game: plainGame,
        target: plainTarget,
        amount: damageDone,
      }),
    );

    if (target.isDead) {
      await this.eventEmitter.emitAsync(
        GameEvent.EntityDied,
        new EntityDiedPayload({ game: plainGame, target: plainTarget }),
      );
    }
  }
}
