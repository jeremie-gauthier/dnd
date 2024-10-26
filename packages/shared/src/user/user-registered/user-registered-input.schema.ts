import { z } from "zod";

export const userRegisteredInputSchema = z.object({
  id: z.string(),
  avatarUrl: z.string(),
  username: z.string(),
});

export type UserRegisteredInput = z.infer<typeof userRegisteredInputSchema>;
