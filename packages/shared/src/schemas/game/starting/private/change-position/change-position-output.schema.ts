import { z } from "zod";

export const changePositionOutputSchema = z.object({});

export type ChangePositionOutput = z.infer<typeof changePositionOutputSchema>;
