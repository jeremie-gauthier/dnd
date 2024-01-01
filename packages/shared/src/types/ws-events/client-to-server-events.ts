import { ClientGameEvent } from './game-events/game-events.client';
import { ClientLobbyEvent } from './lobby-events/lobby-events.client';

interface EventsAndPayloads {
  [ClientLobbyEvent.RequestNewGame]: { nbPlayers: number; stageId: string };
  [ClientGameEvent.PlayerIsReady]: undefined;
}

export type ClientToServerEvents = {
  [Event in keyof EventsAndPayloads]: (payload: EventsAndPayloads[Event]) => void;
};
