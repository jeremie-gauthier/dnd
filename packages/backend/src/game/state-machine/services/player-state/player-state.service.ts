import { GameEntity, PlayerGamePhase, PlayerGameState } from "@dnd/shared";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { VisibilityService } from "src/game/map/services/visibility/visibility.service";

@Injectable()
export class PlayerStateService {
  constructor(private readonly visibilityService: VisibilityService) {}

  public getPlayerState({
    game,
    userId,
  }: { game: GameEntity; userId: User["id"] }): PlayerGameState {
    const isGameMaster = game.gameMaster.userId === userId;
    const gameFromRoleVisibility = isGameMaster
      ? this.visibilityService.getMapForGameMaster({ game })
      : this.visibilityService.getMapForHero({ game });

    if (this.isPreparingForBattle(gameFromRoleVisibility)) {
      return this.sendGamePreparationMessage({
        game: gameFromRoleVisibility,
        userId,
      });
    } else if (this.isBattleOngoing(gameFromRoleVisibility)) {
      return this.sendNewPlayerTurnMessage({
        game: gameFromRoleVisibility,
        userId,
      });
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
