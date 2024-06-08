import type { z } from "zod";
import type { GameEntity } from "../database/game";
import type { LobbyEntity } from "../database/lobby";
import type { GameLog } from "../game";
import { createLobbyOutputSchema, getLobbiesOutputSchema } from "../lobby";
import {
  ServerGameEvent,
  type PlayerGameState,
} from "./game-events/game-events.server";
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
  [ServerGameEvent.GameChangesDetected]: (payload: PlayerGameState) => void;
  [ServerGameEvent.GameLogCreated]: (payload: GameLog) => void;
  [ServerLobbyEvent.UserLeftLobby]: () => void;
  [ServerLobbyEvent.LobbyCreated]: (payload: {
    lobby: z.infer<typeof createLobbyOutputSchema>;
  }) => void;
}

export type ServerToClientEvents =
  EventsMapper<ServerToClientEventsAndPayloads>;
