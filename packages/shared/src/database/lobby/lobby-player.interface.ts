import { z } from "zod";

export const lobbyPlayerSchema = z.object({
  userId: z.string().uuid(),
  heroesSelected: z.array(z.string().uuid()),
  isReady: z.boolean(),
});

export type LobbyPlayer = z.infer<typeof lobbyPlayerSchema>;
