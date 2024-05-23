import { z } from "zod";

export const getTranslationInputSchema = z.object({
  locale: z.string(),
  namespace: z.string(),
});

export type GetTranslationInput = z.infer<typeof getTranslationInputSchema>;
