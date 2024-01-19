import { z } from 'zod';

export const createLobbyInputSchema = z.object({
  nbPlayersMax: z.number().min(2).max(5),
  stageId: z.string().uuid(),
});
