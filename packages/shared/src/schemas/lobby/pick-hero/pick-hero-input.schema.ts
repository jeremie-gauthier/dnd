import { z } from "zod";

export const pickHeroInputSchema = z.object({
  lobbyId: z.string().uuid(),
  heroId: z.string().uuid(),
});

export type PickHeroInput = z.infer<typeof pickHeroInputSchema>;
