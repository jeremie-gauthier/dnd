import type { GameView, PlayableEntity, PlayerGamePhase } from "../../database";

export const ServerGameEvent = {
  GameStart: "server.game.start",
  GameChangesDetected: "server.game.changes_detected",
  GameLogCreated: "server.game.log_created",
  GameEnds: "server.game.ended",
} as const;

export type PlayerGameState = {
  game: GameView;
  yourStatus: PlayerGamePhase;
  playerCurrentlyPlaying: {
    userId: string;
    entityId: PlayableEntity["id"];
  };
};
