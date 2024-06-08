import { z } from "zod";

const heroSchema = z.object({
  id: z.string(),
  pickedBy: z.string().optional(),
  name: z.string(),
  class: z.enum(["WARRIOR", "CLERIC", "SORCERER", "THIEF"]),
  level: z.number(),
  characteristic: z.object({
    baseHealthPoints: z.number(),
    baseManaPoints: z.number(),
    baseArmorClass: z.number(),
    baseMovementPoints: z.number(),
    baseActionPoints: z.number(),
  }),
  inventory: z.object({
    storageCapacity: z.object({
      nbArtifactSlots: z.number().min(0),
      nbSpellSlots: z.number().min(0),
      nbWeaponSlots: z.number().min(0),
      nbBackpackSlots: z.number().min(0),
    }),
    stuff: z.array(
      z.object({
        id: z.string().uuid(),
        storageSpace: z.enum(["GEAR", "BACKPACK"]),
        item: z.object({
          name: z.string(),
          level: z.number().min(0),
          imgUrl: z.string(),
        }),
      }),
    ),
  }),
});

export const createLobbyOutputSchema = z.object({
  id: z.string(),
  status: z.enum(["OPENED", "GAME_INITIALIZING", "GAME_STARTED"]),
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
        order: z.number(),
        intro: z.string(),
        outro: z.string(),
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

export type CreateLobbyOutput = z.infer<typeof createLobbyOutputSchema>;
