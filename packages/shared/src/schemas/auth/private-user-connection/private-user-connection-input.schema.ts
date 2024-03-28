import { z } from "zod";

export const privateUserConnectionInputSchema = z.object({
  avatarUrl: z.string(),
  username: z.string(),
});

export type PrivateUserConnectionInput = z.infer<
  typeof privateUserConnectionInputSchema
>;
