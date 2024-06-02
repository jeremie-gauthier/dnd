import { z } from "zod";

export const pickGameMasterInputSchema = z.object({
  lobbyId: z.string().uuid(),
});

export type PickGameMasterInput = z.infer<typeof pickGameMasterInputSchema>;
