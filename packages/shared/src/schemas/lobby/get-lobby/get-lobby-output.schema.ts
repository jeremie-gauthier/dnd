import { z } from "zod";

const heroSchema = z.object({
  id: z.string(),
  pickedBy: z.string().optional(),
  name: z.string(),
  class: z.enum(["WARRIOR", "CLERIC", "SORCERER", "THIEF"]),
  baseHealthPoints: z.number(),
  baseManaPoints: z.number(),
  baseArmorClass: z.number(),
  baseMovementPoints: z.number(),
  baseActionPoints: z.number(),
});

export const getLobbyOutputSchema = z.object({
  id: z.string(),
  host: z.object({
    userId: z.string(),
  }),
  config: z.object({
    nbPlayersMax: z.number(),
    campaign: z.object({
      id: z.string(),
      title: z.string(),
      nbStages: z.number(),
      stage: z.object({
        id: z.string(),
        title: z.string(),
        intro: z.string(),
        outro: z.string(),
        order: z.number(),
      }),
    }),
  }),
  players: z.array(
    z.object({
      userId: z.string(),
      heroesSelected: z.array(z.string()),
      isReady: z.boolean(),
    }),
  ),
  gameMaster: z.object({
    userId: z.string().optional(),
  }),
  heroesAvailable: z.array(heroSchema),
});

export type GetLobbyOutput = z.infer<typeof getLobbyOutputSchema>;
