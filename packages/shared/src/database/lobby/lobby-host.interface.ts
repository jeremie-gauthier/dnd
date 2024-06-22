import { z } from "zod";

export const lobbyHostSchema = z.object({
  userId: z.string(),
});

export type LobbyHost = z.infer<typeof lobbyHostSchema>;
