import { z } from "zod";

const baseSchema = z.object({
  id: z.string().uuid(),
  pickedBy: z.string().optional(),
});

export const lobbyGameMasterSchema = baseSchema.merge(
  z.object({ type: z.literal("game_master") }),
);

export type LobbyGameMaster = z.infer<typeof lobbyGameMasterSchema>;

export const lobbyHeroSchema = baseSchema.merge(
  z.object({ type: z.literal("hero") }),
);

export type LobbyHero = z.infer<typeof lobbyHeroSchema>;

export const lobbyPlayableCharacterSchema = z.union([
  lobbyGameMasterSchema,
  lobbyHeroSchema,
]);

export type LobbyPlayableCharacter = z.infer<
  typeof lobbyPlayableCharacterSchema
>;
