import { z } from "zod";

export const userRegisteredOutputSchema = z.object({});

export type UserRegisteredOutput = z.infer<typeof userRegisteredOutputSchema>;
