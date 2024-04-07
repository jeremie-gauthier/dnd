import { z } from "zod";

export const getUserInputSchema = z.object({});

export type GetUserInput = z.infer<typeof getUserInputSchema>;
