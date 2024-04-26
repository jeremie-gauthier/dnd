import { z } from "zod";

export const discardHeroOutputSchema = z.object({});

export type DiscardHeroOutput = z.infer<typeof discardHeroOutputSchema>;
