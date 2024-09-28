import { z } from "zod";
import { artifactSchema } from "./artifact.interface";
import { spellSchema, weaponSchema } from "./attack-item.interface";
import { chestTrapSchema } from "./chest-trap.interface";
import { potionSchema } from "./potion.interface";

export const gameItemSchema = z.union([
  weaponSchema,
  spellSchema,
  chestTrapSchema,
  potionSchema,
  artifactSchema,
]);

export type GameItem = z.infer<typeof gameItemSchema>;
