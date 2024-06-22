import { z } from "zod";

export const listenLobbyChangesInputSchema = z.object({
  lobbyId: z.string().uuid(),
});

export type ListenLobbyChangesInput = z.infer<
  typeof listenLobbyChangesInputSchema
>;
