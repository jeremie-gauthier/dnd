import { z } from "zod";

export const startGameOutputSchema = z.object({});

export type StartGameOutput = z.infer<typeof startGameOutputSchema>;
