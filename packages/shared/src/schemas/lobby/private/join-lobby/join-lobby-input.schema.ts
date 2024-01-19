import { z } from 'zod';

export const joinLobbyInputSchema = z.object({
  lobbyId: z.string().uuid(),
});
