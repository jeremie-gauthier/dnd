import { z } from "zod";

export const discardGameMasterOutputSchema = z.object({});

export type DiscardGameMasterOutput = z.infer<
  typeof discardGameMasterOutputSchema
>;
