import type { GameView, Tile, TileEntity } from "@dnd/shared";
import { RefObject } from "react";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";
import { useAssetsLoader } from "../assets-loader/assets-loader";
import { floorAssetCollection } from "../assets-loader/assets.config";
import { drawBackground } from "../draw/draw-background";
import { drawFloor } from "../draw/entities/draw-floor";
import { centerIsometricDrawing } from "../draw/utils/center-isometric-drawing.util";

type Params = {
  canvasRef: RefObject<HTMLCanvasElement>;
};

export const useFloorLayer = ({ canvasRef }: Params) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const { assets, assetSize } = useAssetsLoader(floorAssetCollection);

  const render = ({ map }: { map: GameView["map"] }) => {
    if (!canvas || !context || !assets) return;

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

      drawFloor({
        context,
        config,
        subject: {
          coord2D,
          coordIsometric,
          entity: {} as TileEntity,
        },
      });
    }

    context.restore();
  };

  return { render };
};

const shouldSkipTileRendering = ({ tile }: { tile: Tile }): boolean => {
  return tile.entities.some(
    (entity) =>
      entity.type === "non-interactive-entity" && entity.kind === "off-map",
  );
};
