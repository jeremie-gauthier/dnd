import { z } from "zod";

export const joinLobbyOutputSchema = z.object({
  lobbyId: z.string(),
});

export type JoinLobbyOutput = z.infer<typeof joinLobbyOutputSchema>;
