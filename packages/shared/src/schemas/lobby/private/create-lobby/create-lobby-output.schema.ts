import { z } from 'zod';

const heroSchema = z.object({
  id: z.string(),
  pickedBy: z.string().optional(),
});

export const createLobbyOutputSchema = z.object({
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
  players: z.array(
    z.object({
      userId: z.string(),
      heroesSelected: z.array(z.string()),
    }),
  ),
  heroesAvailable: z.array(heroSchema),
});
