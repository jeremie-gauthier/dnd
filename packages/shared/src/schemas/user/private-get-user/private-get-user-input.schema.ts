import { z } from "zod";

export const privateGetUserInputSchema = z.object({});

export type PrivateGetUserInput = z.infer<typeof privateGetUserInputSchema>;
