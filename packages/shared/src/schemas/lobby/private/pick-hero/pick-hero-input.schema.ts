import { z } from "zod";

export const pickHeroInputSchema = z.object({
  lobbyId: z.string().uuid(),
  heroId: z.string().uuid(),
});
