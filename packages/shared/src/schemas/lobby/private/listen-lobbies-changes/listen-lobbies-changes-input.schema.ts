import { z } from "zod";

export const listenLobbiesChangesInputSchema = z.object({});

export type ListenLobbiesChangesInput = z.infer<
  typeof listenLobbiesChangesInputSchema
>;
