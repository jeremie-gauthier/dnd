import { z } from "zod";

export const getHeroDetailsInputSchema = z.object({
  heroId: z.string().uuid(),
});

export type GetHeroDetailsInput = z.infer<typeof getHeroDetailsInputSchema>;
