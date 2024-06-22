import { z } from "zod";

export const userConnectionOutputSchema = z.object({
  userId: z.string(),
});

export type UserConnectionOutput = z.infer<typeof userConnectionOutputSchema>;
