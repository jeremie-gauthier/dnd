import { ServerGameEvent } from './game-events/game-events.server';
import { ServerLobbyEvent } from './lobby-events/lobby-events.server';

interface EventsAndPayloads {
  [ServerLobbyEvent.GameReady]: undefined;
  [ServerLobbyEvent.Error]: { name: string; message: string };
  [ServerGameEvent.GameStart]: undefined;
}

export type ServerToClientEvents = {
  [Event in keyof EventsAndPayloads]: (payload: EventsAndPayloads[Event]) => void;
};
