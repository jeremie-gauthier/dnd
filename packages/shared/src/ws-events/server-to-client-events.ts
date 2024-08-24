import type { z } from "zod";
import type { GameView } from "../database/game";
import type { LobbyView } from "../database/lobby";
import type { GameLog } from "../game";
import { createLobbyOutputSchema, getLobbiesOutputSchema } from "../lobby";
import {
  type PlayerGameState,
  ServerGameEvent,
} from "./game-events/game-events.server";
import { ServerLobbyEvent } from "./lobby-events/lobby-events.server";
import type { EventsMapper } from "./utils.type";

interface ServerToClientEventsAndPayloads
  extends Record<string, (...parameters: any[]) => any> {
  [ServerLobbyEvent.LobbyChangesDetected]: (payload: {
    lobby: LobbyView;
  }) => void;
  [ServerLobbyEvent.LobbiesChangesDetected]: (payload: {
    lobby: z.infer<typeof getLobbiesOutputSchema>[number];
  }) => void;
  [ServerLobbyEvent.LobbiesDeleted]: (payload: {
    lobbyId: LobbyView["id"];
  }) => void;
  [ServerLobbyEvent.Error]: (payload: {
    name: string;
    message: string;
  }) => void;
  [ServerLobbyEvent.GameInitializationDone]: (payload: {
    game: GameView;
  }) => void;
  [ServerGameEvent.GameStart]: () => void;
  [ServerGameEvent.GameChangesDetected]: (payload: PlayerGameState) => void;
  [ServerGameEvent.GameLogCreated]: (payload: GameLog) => void;
  [ServerLobbyEvent.UserLeftLobby]: () => void;
  [ServerLobbyEvent.LobbyCreated]: (payload: {
    lobby: z.infer<typeof createLobbyOutputSchema>;
  }) => void;
  [ServerGameEvent.GameEnds]: (payload: {
    gameConditionsStatus: "victory" | "defeat";
  }) => void;
}

export type ServerToClientEvents =
  EventsMapper<ServerToClientEventsAndPayloads>;
