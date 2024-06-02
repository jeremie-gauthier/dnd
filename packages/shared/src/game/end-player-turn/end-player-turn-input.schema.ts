import { z } from "zod";

export const endPlayerTurnInputSchema = z.object({});

export type EndPlayerTurnInput = z.infer<typeof endPlayerTurnInputSchema>;
