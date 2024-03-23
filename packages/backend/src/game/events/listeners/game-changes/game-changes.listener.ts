import { GameEntity, PlayerGamePhase, ServerGameEvent } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { MessageContext } from "src/types/socket.type";
import { GameEvent } from "../../emitters/game-events.enum";

@Injectable()
export class GameChangesListener {
  @OnEvent(GameEvent.GamePreparationPhaseStarted)
  public async handler({
    ctx,
    game,
  }: { ctx: MessageContext; game: GameEntity }) {
    if (this.isPreparingForBattle(game)) {
      this.sendGamePreparationMessage({ ctx, game });
    } else if (this.isBattleOngoing(game)) {
      this.sendNewPlayerTurnMessage({ ctx, game });
    }
  }

  private isPreparingForBattle(
    game: GameEntity<"prepare_for_battle"> | GameEntity<"battle_ongoing">,
  ): game is GameEntity<"prepare_for_battle"> {
    return game.status === "prepare_for_battle";
  }

  private sendGamePreparationMessage({
    ctx,
    game,
  }: {
    ctx: MessageContext;
    game: GameEntity<"prepare_for_battle">;
  }): void {
    const playableEntities = Object.values(game.playableEntities);
    const userIds = new Set(
      playableEntities.map((playableEntity) => playableEntity.playedByUserId),
    );

    for (const userId of userIds) {
      ctx.server.to(userId).emit(ServerGameEvent.GameChangesDetected, {
        game,
        playerPhase: "preparation",
      });
    }
  }

  private isBattleOngoing(
    game: GameEntity<"prepare_for_battle"> | GameEntity<"battle_ongoing">,
  ): game is GameEntity<"battle_ongoing"> {
    return game.status === "battle_ongoing";
  }

  private sendNewPlayerTurnMessage({
    ctx,
    game,
  }: {
    ctx: MessageContext;
    game: GameEntity<"battle_ongoing">;
  }): void {
    const playableEntities = Object.values(game.playableEntities);
    const playableEntityTurn = playableEntities.find(
      ({ currentPhase }) => currentPhase === "action",
    );
    if (!playableEntityTurn) {
      return;
    }

    const userIdTurn = playableEntityTurn.playedByUserId;
    const entityIdTurn = playableEntityTurn.id;

    const userIds = new Set(
      playableEntities.map((playableEntity) => playableEntity.playedByUserId),
    );

    for (const userId of userIds) {
      const playerPhase: PlayerGamePhase =
        userId === userIdTurn ? "action" : "idle";

      ctx.server.to(userId).emit(ServerGameEvent.GameChangesDetected, {
        game,
        playerPhase,
        userIdTurn,
        entityIdTurn,
      });
    }
  }
}
