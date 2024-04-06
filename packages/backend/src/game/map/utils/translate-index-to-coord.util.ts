import type { Coord } from "@dnd/shared";

type Input = {
  index: number;
  metadata: {
    width: number;
    height: number;
  };
};

export function translateIndexToCoord({ index, metadata }: Input): Coord {
  // rely only on width even if the height is different
  // as the resulting array is just a "`height` chunks of `width` size"
  return {
    row: Math.floor(index / metadata.width),
    column: index % metadata.width,
  };
}
