import { z } from "zod";

export const discardPlayableCharacterInputSchema = z.object({
  lobbyId: z.string().uuid(),
  playableCharacterId: z.string().uuid(),
});

export type DiscardPlayableCharacterInput = z.infer<
  typeof discardPlayableCharacterInputSchema
>;
