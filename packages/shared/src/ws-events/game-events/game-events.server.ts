import type {
  GameEntity,
  PlayableEntity,
  PlayerGamePhase,
} from "../../database";

export const ServerGameEvent = {
  GameStart: "server.game.start",
  GameChangesDetected: "server.game.changes_detected",
  GameLogCreated: "server.game.log_created",
} as const;

export type PlayerGameState =
  | {
      game: GameEntity<"prepare_for_battle">;
      playerPhase: "preparation";
    }
  | {
      game: GameEntity<"battle_ongoing">;
      playerPhase: Exclude<PlayerGamePhase, "preparation">;
      userIdTurn: string;
      entityIdTurn: PlayableEntity["id"];
    };
