import { z } from "zod";

export const pickPlayableCharacterInputSchema = z.object({
  lobbyId: z.string().uuid(),
  playableCharacterId: z.string().uuid(),
});

export type PickPlayableCharacterInput = z.infer<
  typeof pickPlayableCharacterInputSchema
>;
