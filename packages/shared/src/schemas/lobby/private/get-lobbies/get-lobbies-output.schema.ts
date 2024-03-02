import { z } from "zod";

export const getLobbiesOutputSchema = z.array(
  z.object({
    id: z.string(),
    host: z.object({
      userId: z.string(),
    }),
    config: z.object({
      nbPlayersMax: z.number(),
      campaign: z.object({
        id: z.string(),
        title: z.string(),
        nbStages: z.number(),
        stage: z.object({
          id: z.string(),
          title: z.string(),
          order: z.number(),
        }),
      }),
    }),
    nbPlayers: z.number(),
  }),
);
