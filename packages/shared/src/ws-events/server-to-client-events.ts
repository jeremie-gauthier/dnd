import type { z } from "zod";
import type { GameEntity, PlayableEntity } from "../database/game";
import type { PlayerGamePhase } from "../database/game/player-phase.type";
import type { LobbyEntity } from "../database/lobby";
import type { getLobbiesOutputSchema } from "../schemas";
import { ServerGameEvent } from "./game-events/game-events.server";
import { ServerLobbyEvent } from "./lobby-events/lobby-events.server";
import type { EventsMapper } from "./utils.type";

interface ServerToClientEventsAndPayloads
  extends Record<string, (...parameters: any[]) => any> {
  [ServerLobbyEvent.LobbyChangesDetected]: (payload: {
    lobby: LobbyEntity;
  }) => void;
  [ServerLobbyEvent.LobbiesChangesDetected]: (payload: {
    lobby: z.infer<typeof getLobbiesOutputSchema>[number];
  }) => void;
  [ServerLobbyEvent.LobbiesDeleted]: (payload: {
    lobbyId: LobbyEntity["id"];
  }) => void;
  [ServerLobbyEvent.Error]: (payload: {
    name: string;
    message: string;
  }) => void;
  [ServerLobbyEvent.GameInitializationStarted]: () => void;
  [ServerLobbyEvent.GameInitializationDone]: (payload: {
    game: GameEntity;
  }) => void;
  [ServerGameEvent.GameStart]: () => void;
  [ServerGameEvent.GameChangesDetected]: (
    payload:
      | {
          game: GameEntity<"prepare_for_battle">;
          playerPhase: PlayerGamePhase;
        }
      | {
          game: GameEntity<"battle_ongoing">;
          playerPhase: PlayerGamePhase;
          userIdTurn: PlayableEntity["playedByUserId"];
          entityIdTurn: PlayableEntity["id"];
        },
  ) => void;
}

export type ServerToClientEvents =
  EventsMapper<ServerToClientEventsAndPayloads>;
