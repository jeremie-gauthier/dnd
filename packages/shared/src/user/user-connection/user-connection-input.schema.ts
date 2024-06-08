import { z } from "zod";

export const userConnectionInputSchema = z.object({
  avatarUrl: z.string(),
  username: z.string(),
});

export type UserConnectionInput = z.infer<typeof userConnectionInputSchema>;
