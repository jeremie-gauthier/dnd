import { z } from 'zod';

export const discardHeroInputSchema = z.object({
  lobbyId: z.string().uuid(),
  heroId: z.string().uuid(),
});
