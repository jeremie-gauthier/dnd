import { z } from "zod";

export const joinLobbyInputSchema = z.object({
  lobbyId: z.string().uuid(),
});

export type JoinLobbyInput = z.infer<typeof joinLobbyInputSchema>;
