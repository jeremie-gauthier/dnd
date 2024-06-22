import { z } from "zod";
import { lobbyConfigSchema } from "./lobby-config.interface";
import { lobbyHostSchema } from "./lobby-host.interface";
import { lobbyPlayableCharacterSchema } from "./lobby-playable-character.interface";
import { lobbyPlayerSchema } from "./lobby-player.interface";

export const lobbySchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["OPENED", "GAME_INITIALIZING", "GAME_STARTED"]),
  host: lobbyHostSchema,
  config: lobbyConfigSchema,
  players: z.array(lobbyPlayerSchema),
  playableCharacters: z.array(lobbyPlayableCharacterSchema),
});

export type LobbyView = z.infer<typeof lobbySchema>;
