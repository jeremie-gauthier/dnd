import { z } from "zod";

export const discardGameMasterInputSchema = z.object({
  lobbyId: z.string().uuid(),
});

export type DiscardGameMasterInput = z.infer<
  typeof discardGameMasterInputSchema
>;
