import { z } from "zod";

export const handleWsDisconnectionOutputSchema = z.object({});

export type HandleWsDisconnectionOutput = z.infer<
  typeof handleWsDisconnectionOutputSchema
>;
