import type { Coord } from "@dnd/shared";

type Input = {
  coord: Coord;
  metadata: {
    width: number;
    height: number;
  };
};

export function translateCoordToIndex({ coord, metadata }: Input): number {
  return coord.row * metadata.width + coord.column;
}
