import { z } from "zod";

export const getLobbiesInputSchema = z.object({});

export type GetLobbiesInput = z.infer<typeof getLobbiesInputSchema>;
