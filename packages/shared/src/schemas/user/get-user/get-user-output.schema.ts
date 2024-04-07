import { z } from "zod";

export const getUserOutputSchema = z.object({
  id: z.string(),
  avatarUrl: z.string(),
  username: z.string(),
});

export type GetUserOutput = z.infer<typeof getUserOutputSchema>;
