import { z } from "zod";

export const pickPlayableCharacterOutputSchema = z.object({});

export type PickPlayableCharacterOutput = z.infer<
  typeof pickPlayableCharacterOutputSchema
>;
