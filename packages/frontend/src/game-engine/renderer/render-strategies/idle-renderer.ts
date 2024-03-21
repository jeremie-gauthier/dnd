import { drawEntity } from "../draw/draw-entity";
import { getTileEntitiesSorted } from "../draw/utils/get-tile-entities-sorted.util";
import type { RendererParams } from "./renderer-params.interface";

export function idleRenderer({
  playableEntities,
  tile,
  context,
  config,
  coord2D,
  coordIsometric,
}: RendererParams) {
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
