import { Coord } from "@dnd/shared";

type Input = {
  index: number;
  metadata: {
    width: number;
    height: number;
  };
};

export function translateIndexToCoord({ index, metadata }: Input): Coord {
  return {
    row: Math.floor(index / metadata.width),
    column: index % metadata.width,
  };
}
