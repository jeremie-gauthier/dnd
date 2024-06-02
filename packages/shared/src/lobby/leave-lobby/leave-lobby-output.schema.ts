import { z } from "zod";

export const leaveLobbyOutputSchema = z.object({
  message: z.literal("Ok"),
});

export type LeaveLobbyOutput = z.infer<typeof leaveLobbyOutputSchema>;
