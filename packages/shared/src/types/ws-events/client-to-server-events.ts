import { ClientGameEvent } from './game-events/game-events.client';
import { ClientLobbyEvent } from './lobby-events/lobby-events.client';

interface ClientToServerEventsAndPayloads {
  [ClientLobbyEvent.RequestNewGame]: { nbPlayers: number; stageId: string };
  [ClientGameEvent.PlayerIsReady]: undefined;
}

export type ClientToServerEvents = {
  [Event in keyof ClientToServerEventsAndPayloads]: (
    payload: ClientToServerEventsAndPayloads[Event],
  ) => void;
};
