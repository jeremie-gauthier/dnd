import { z } from 'zod';

export const startGameInputSchema = z.object({
  lobbyId: z.string().uuid(),
});
