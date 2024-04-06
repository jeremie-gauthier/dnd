import type { z } from "zod";
import type { GameEntity } from "../database/game";
import type { LobbyEntity } from "../database/lobby";
import type { getLobbiesOutputSchema } from "../schemas";
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
}

export type ServerToClientEvents =
  EventsMapper<ServerToClientEventsAndPayloads>;
