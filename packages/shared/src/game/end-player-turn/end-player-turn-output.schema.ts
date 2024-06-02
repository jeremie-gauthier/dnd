import { z } from "zod";

export const endPlayerTurnOutputSchema = z.object({});

export type EndPlayerTurnOutput = z.infer<typeof endPlayerTurnOutputSchema>;
