import { Coord, coordToIndex, indexToCoord } from "@dnd/shared";
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
    return coordToIndex({ coord, metadata });
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
    return indexToCoord({ index, metadata });
  }
}
