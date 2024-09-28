import { z } from "zod";
import { baseItemSchema } from "./base-item.interface";

export const chestTrapSchema = baseItemSchema.merge(
  z.object({
    type: z.literal("ChestTrap"),
  }),
);
export type ChestTrapItem = z.infer<typeof chestTrapSchema>;
