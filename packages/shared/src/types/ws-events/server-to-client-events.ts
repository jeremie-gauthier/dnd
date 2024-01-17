import { z } from 'zod';
import { getLobbiesOutputSchema } from '../../schemas';
import { ServerGameEvent } from './game-events/game-events.server';
import { ServerLobbyEvent } from './lobby-events/lobby-events.server';
import { EventsMapper } from './utils.type';

interface ServerToClientEventsAndPayloads extends Record<string, (...parameters: any[]) => any> {
  [ServerLobbyEvent.LobbiesChangesDetected]: (payload: {
    lobby: z.infer<typeof getLobbiesOutputSchema>[number];
  }) => void;
  [ServerLobbyEvent.GameReady]: () => void;
  [ServerLobbyEvent.Error]: (payload: { name: string; message: string }) => void;
  [ServerGameEvent.GameStart]: () => void;
}

export type ServerToClientEvents = EventsMapper<ServerToClientEventsAndPayloads>;
