import { z } from "zod";

export const privateUserConnectionOutputSchema = z.object({
  userId: z.string(),
});

export type PrivateUserConnectionOutput = z.infer<
  typeof privateUserConnectionOutputSchema
>;
