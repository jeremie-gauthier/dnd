import { z } from "zod";

export const diceSchema = z.object({
  name: z.string(),
  values: z.array(z.number()).length(6),
  minValue: z.number(),
  maxValue: z.number(),
  meanValue: z.number(),
});

export type Dice = z.infer<typeof diceSchema>;
