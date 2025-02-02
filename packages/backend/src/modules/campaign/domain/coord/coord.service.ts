import { coordToIndex, indexToCoord } from "@dnd/shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CoordService {
  public coordToIndex({ coord, metadata }: Parameters<typeof coordToIndex>[0]) {
    return coordToIndex({ coord, metadata });
  }

  public indexToCoord({ index, metadata }: Parameters<typeof indexToCoord>[0]) {
    return indexToCoord({ index, metadata });
  }
}
