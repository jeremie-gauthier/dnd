import { drawEntity } from "../draw/draw-entity";
import { drawStartingTile } from "../draw/layers/draw-starting-tile";
import { getTileEntitiesSorted } from "../draw/utils/get-tile-entities-sorted.util";
import type { RendererParams } from "./renderer-params.interface";

export function preparationRenderer({
  playableEntities,
  tile,
  context,
  config,
  coord2D,
  coordIsometric,
}: RendererParams) {
  drawStartingTile({
    context,
    config,
    subject: {
      coord2D,
      coordIsometric,
      tile,
    },
  });

  const tileEntitiesSorted = getTileEntitiesSorted(tile.entities);
  for (const entity of tileEntitiesSorted) {
    drawEntity({
      context,
      config,
      subject: {
        coord2D,
        coordIsometric,
        entity,
      },
      playableEntities,
    });
  }
}
