import { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { CoordService } from "../coord/coord.service";

@Injectable()
export class MapService {
  constructor(private readonly coordService: CoordService) {}

  public completePartialMapWithVoidTiles({
    height,
    width,
    partialMapTiles,
  }: {
    height: number;
    width: number;
    partialMapTiles: GameEntity["map"]["tiles"];
  }): GameEntity["map"]["tiles"] {
    return Array.from({ length: width * height }).map((_, index) => {
      const tileCoord = this.coordService.indexToCoord({
        index,
        metadata: { width, height },
      });
      const existingTile = partialMapTiles.find(
        ({ coord }) =>
          coord.column === tileCoord.column && coord.row === tileCoord.row,
      );

      return (
        existingTile ?? {
          coord: tileCoord,
          entities: [
            {
              type: "non-playable-non-interactive-entity",
              kind: "off-map",
              canInteract: false,
              isBlocking: true,
              isVisible: true,
            },
          ],
        }
      );
    });
  }
}
