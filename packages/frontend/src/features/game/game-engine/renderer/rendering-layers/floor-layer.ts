import {
  Board,
  NonInteractiveEntityKind,
  Tile,
  TileEntitiesItem,
  TileEntityType,
} from "@/openapi/dnd-api";
import { getLineOfSight } from "@dnd/shared";
import { PlayableEntity } from "@features/game/interfaces/dnd-api/playable-entity.interface";
import { RefObject } from "react";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";
import { useAssetsLoader } from "../assets-loader/assets-loader";
import { floorAssetCollection } from "../assets-loader/assets.config";
import { drawBackground } from "../draw/draw-background";
import { drawFloor } from "../draw/entities/draw-floor";
import { drawFloorNotInSight } from "../draw/entities/draw-floor_not_in_sight";
import { centerIsometricDrawing } from "../draw/utils/center-isometric-drawing.util";

type Params = {
  canvasRef: RefObject<HTMLCanvasElement>;
};

export const useFloorLayer = ({ canvasRef }: Params) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const { assets, assetSize } = useAssetsLoader(floorAssetCollection);

  const render = ({
    map,
    entityPlaying,
  }: { map: Board; entityPlaying?: PlayableEntity }) => {
    if (!canvas || !context || !assets) return;

    const lineOfSight = entityPlaying
      ? getLineOfSight({
          ally: entityPlaying.faction,
          gameBoard: map,
          originCoord: entityPlaying.coord,
          range: "versatile",
        })
          .map(({ coord }) => coord)
          .concat(entityPlaying.coord)
      : [];

    const config = { assets, assetSize, map };

    context.save();

    drawBackground({
      context,
      canvasHeight: canvas.height,
      canvasWidth: canvas.width,
    });

    centerIsometricDrawing({ context, map, assetSize });

    for (const tile of map.tiles) {
      if (shouldSkipTileRendering({ tile })) {
        continue;
      }

      const coord2D = tile.coord;
      const coordIsometric = translate2DToIsometricCoord(tile.coord, {
        assetSize,
        // Beware of the offset, it may shift everything being computed here.
        // We really want to have the tiles next to the borders of the canvas.
        map: {
          height: map.height * assetSize,
          width: map.width * assetSize,
        },
      });

      const isInLineOfSight = lineOfSight.some(
        (coord) => coord.column === coord2D.column && coord.row === coord2D.row,
      );

      if (isInLineOfSight) {
        drawFloor({
          context,
          config,
          subject: {
            coord2D,
            coordIsometric,
            entity: {} as TileEntitiesItem,
          },
        });
      } else {
        drawFloorNotInSight({
          context,
          config,
          subject: {
            coord2D,
            coordIsometric,
            entity: {} as TileEntitiesItem,
          },
        });
      }
    }

    context.restore();
  };

  return { render };
};

const shouldSkipTileRendering = ({ tile }: { tile: Tile }): boolean => {
  return tile.entities.some(
    (entity) =>
      entity.type === TileEntityType.NON_INTERACTIVE_ENTITY &&
      entity.kind === NonInteractiveEntityKind.off_map,
  );
};
