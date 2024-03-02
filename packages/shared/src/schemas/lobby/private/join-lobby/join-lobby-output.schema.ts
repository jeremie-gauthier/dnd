import { z } from "zod";

export const joinLobbyOutputSchema = z.object({
  lobbyId: z.string(),
});
