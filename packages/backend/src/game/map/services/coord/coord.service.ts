import { Coord } from "@dnd/shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CoordService {
  public coordToIndex({
    coord,
    metadata,
  }: {
    coord: Coord;
    metadata: {
      width: number;
      height: number;
    };
  }) {
    return coord.row * metadata.width + coord.column;
  }

  public indexToCoord({
    index,
    metadata,
  }: {
    index: number;
    metadata: {
      width: number;
      height: number;
    };
  }) {
    // rely only on width even if the height is different
    // as the resulting array is just a "`height` chunks of `width` size"
    return {
      row: Math.floor(index / metadata.width),
      column: index % metadata.width,
    };
  }
}
