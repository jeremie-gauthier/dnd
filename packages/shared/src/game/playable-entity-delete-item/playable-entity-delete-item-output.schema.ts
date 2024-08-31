import { z } from "zod";

export const playableEntityDeleteItemOutputSchema = z.object({});

export type PlayableEntityDeleteItemOutput = z.infer<
  typeof playableEntityDeleteItemOutputSchema
>;
