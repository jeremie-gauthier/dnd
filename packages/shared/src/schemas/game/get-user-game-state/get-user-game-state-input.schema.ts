import { z } from "zod";

export const getUserGameStateInputSchema = z.object({});

export type GetUserGameStateInput = z.infer<typeof getUserGameStateInputSchema>;
