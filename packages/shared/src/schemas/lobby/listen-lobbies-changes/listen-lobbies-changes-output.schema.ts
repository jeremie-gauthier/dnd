import { z } from "zod";

export const listenLobbiesChangesOutputSchema = z.object({});

export type ListenLobbiesChangesOutput = z.infer<
  typeof listenLobbiesChangesOutputSchema
>;
