import { GameEntity, PlayerGamePhase, PlayerGameState } from "@dnd/shared";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";

@Injectable()
export class PlayerStateService {
  public getPlayerState({
    game,
    userId,
  }: { game: GameEntity; userId: User["id"] }): PlayerGameState {
    if (this.isPreparingForBattle(game)) {
      return this.sendGamePreparationMessage({ game, userId });
    } else if (this.isBattleOngoing(game)) {
      return this.sendNewPlayerTurnMessage({ game, userId });
    }

    throw new InternalServerErrorException("Unknown game status");
  }

  private isPreparingForBattle(
    game: GameEntity<"prepare_for_battle"> | GameEntity<"battle_ongoing">,
  ): game is GameEntity<"prepare_for_battle"> {
    return game.status === "prepare_for_battle";
  }

  private isBattleOngoing(
    game: GameEntity<"prepare_for_battle"> | GameEntity<"battle_ongoing">,
  ): game is GameEntity<"battle_ongoing"> {
    return game.status === "battle_ongoing";
  }

  private sendGamePreparationMessage({
    game,
  }: {
    game: GameEntity<"prepare_for_battle">;
    userId: User["id"];
  }): PlayerGameState {
    return {
      game,
      playerPhase: "preparation",
    };
  }

  private sendNewPlayerTurnMessage({
    game,
    userId,
  }: {
    game: GameEntity<"battle_ongoing">;
    userId: User["id"];
  }): PlayerGameState {
    const playableEntities = Object.values(game.playableEntities);
    const playableEntityTurn = playableEntities.find(
      ({ currentPhase }) => currentPhase === "action",
    );
    if (!playableEntityTurn) {
      throw new InternalServerErrorException(
        "No playable entity in 'action' phase found",
      );
    }

    const userIdTurn = playableEntityTurn.playedByUserId;
    const entityIdTurn = playableEntityTurn.id;
    const playerPhase: PlayerGamePhase =
      userId === userIdTurn ? "action" : "idle";

    return {
      game,
      playerPhase,
      userIdTurn,
      entityIdTurn,
    };
  }
}
