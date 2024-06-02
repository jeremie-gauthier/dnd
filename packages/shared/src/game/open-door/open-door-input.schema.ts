import { z } from "zod";

export const openDoorInputSchema = z.object({
  gameId: z.string().uuid(),
  coordOfTileWithDoor: z.object({
    row: z.number().min(0),
    column: z.number().min(0),
  }),
});

export type OpenDoorInput = z.infer<typeof openDoorInputSchema>;
