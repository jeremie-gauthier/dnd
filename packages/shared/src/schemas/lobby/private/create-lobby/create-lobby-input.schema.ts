import { z } from 'zod';

export const createLobbyInputSchema = z.object({
  nbPlayers: z.number().min(2).max(5),
  stageId: z.string().uuid(),
});
