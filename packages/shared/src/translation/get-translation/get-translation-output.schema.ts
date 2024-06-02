import { z } from "zod";

export const getTranslationOutputSchema = z.object({
  locale: z.string(),
  namespace: z.string(),
  translations: z.record(z.string(), z.string()),
});

export type GetTranslationOutput = z.infer<typeof getTranslationOutputSchema>;
