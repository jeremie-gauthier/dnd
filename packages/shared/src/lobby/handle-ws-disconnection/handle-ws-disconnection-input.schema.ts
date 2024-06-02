import { z } from "zod";

export const handleWsDisconnectionInputSchema = z.object({});

export type HandleWsDisconnectionInput = z.infer<
  typeof handleWsDisconnectionInputSchema
>;
