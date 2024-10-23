import { z } from "zod";
import { lobbyConfigSchema } from "../../database/lobby/lobby-config.interface";

export const getLobbiesOutputSchema = z.array(
  z.object({
    id: z.string(),
    host: z.object({
      userId: z.string(),
    }),
    config: lobbyConfigSchema,
    nbPlayers: z.number(),
  }),
);

export type GetLobbiesOutput = z.infer<typeof getLobbiesOutputSchema>;
