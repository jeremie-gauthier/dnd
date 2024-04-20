import { z } from "zod";
import { TilePath } from "../../../../utils";

const coordSchema = z.object({
  row: z.number().min(0),
  column: z.number().min(0),
});

const tileSchema = z.object({
  coord: coordSchema,
  entities: z.array(z.any()),
});

const originTilePathSchema = z.object({
  tile: tileSchema,
  range: z.literal(0),
});

const childTilePathSchema: z.ZodType<TilePath> = z.lazy(() =>
  z.object({
    tile: tileSchema,
    range: z.number().gt(0),
    fromTile: pathToTileSchema,
  }),
);

const pathToTileSchema = originTilePathSchema.or(childTilePathSchema);

export const playableEntityMoveInputSchema = z.object({
  gameId: z.string().uuid(),
  pathToTile: pathToTileSchema,
  playableEntityId: z.string().uuid(),
});

export type PlayableEntityMoveInput = z.infer<
  typeof playableEntityMoveInputSchema
>;
