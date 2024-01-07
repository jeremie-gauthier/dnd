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
    stageId: z.string(),
  }),
  players: z.array(
    z.object({
      userId: z.string(),
      heroesSelected: z.array(z.string()),
    }),
  ),
  heroesAvailable: z.array(heroSchema),
});
