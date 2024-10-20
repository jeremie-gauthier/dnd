import { z } from "zod";

export const lobbyConfigSchema = z.object({
  nbPlayersMax: z.number().min(2).max(5),
  campaign: z.object({
    id: z.string(),
    nbStages: z.number(),
    stage: z.object({
      id: z.string().uuid(),
      order: z.number(),
    }),
  }),
});

export type LobbyConfigSchema = z.infer<typeof lobbyConfigSchema>;
