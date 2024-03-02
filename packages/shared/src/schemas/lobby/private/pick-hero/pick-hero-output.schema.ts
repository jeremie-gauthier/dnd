import { z } from "zod";

export const pickHeroOutputSchema = z.object({});

export type PickHeroOutput = z.infer<typeof pickHeroOutputSchema>;
