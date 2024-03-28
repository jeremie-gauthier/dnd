import { z } from "zod";

export const privateGetUserOutputSchema = z.object({
  id: z.string(),
  avatarUrl: z.string(),
  username: z.string(),
});

export type PrivateGetUserOutput = z.infer<typeof privateGetUserOutputSchema>;
