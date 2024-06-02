import { z } from "zod";

export const leaveLobbyInputSchema = z.object({});

export type LeaveLobbyInput = z.infer<typeof leaveLobbyInputSchema>;
