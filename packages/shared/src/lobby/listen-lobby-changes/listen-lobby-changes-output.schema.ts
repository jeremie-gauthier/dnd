import { z } from "zod";

export const listenLobbyChangesOutputSchema = z.object({});

export type ListenLobbyChangesOutput = z.infer<
  typeof listenLobbyChangesOutputSchema
>;
