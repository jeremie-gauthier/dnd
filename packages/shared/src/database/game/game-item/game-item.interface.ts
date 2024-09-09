import { z } from "zod";
import { spellSchema, weaponSchema } from "./attack-item.interface";

export const gameItemSchema = z.union([weaponSchema, spellSchema]);

export type GameItem = z.infer<typeof gameItemSchema>;
