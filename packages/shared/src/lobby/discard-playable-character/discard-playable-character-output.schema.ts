import { z } from "zod";

export const discardPlayableCharacterOutputSchema = z.object({});

export type DiscardPlayableCharacterOutput = z.infer<
  typeof discardPlayableCharacterOutputSchema
>;
