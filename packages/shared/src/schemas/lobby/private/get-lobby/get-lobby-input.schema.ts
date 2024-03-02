import { z } from "zod";

export const getLobbyInputSchema = z.object({});

export type GetLobbyInput = z.infer<typeof getLobbyInputSchema>;
