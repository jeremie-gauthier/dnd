import { z } from "zod";

export const leaveLobbyOutputSchema = z.object({
  message: z.literal("Ok"),
});
