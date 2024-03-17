import { z } from "zod";
import { GameEntity } from "../database/game";
import { LobbyEntity } from "../database/lobby";
import { getLobbiesOutputSchema } from "../schemas";
import { ServerGameEvent } from "./game-events/game-events.server";
import { ServerLobbyEvent } from "./lobby-events/lobby-events.server";
import { EventsMapper } from "./utils.type";

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
  [ServerGameEvent.GameChangesDetected]: (payload: {
    game: GameEntity;
  }) => void;
}

export type ServerToClientEvents =
  EventsMapper<ServerToClientEventsAndPayloads>;
