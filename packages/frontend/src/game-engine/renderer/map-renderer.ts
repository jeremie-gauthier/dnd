import type { GameEntity, Tile, TileEntity } from "@dnd/shared";
import type { RefObject } from "react";
import { translate2DToIsometricCoord } from "../utils/coords-conversion.util";
import { useAssetsLoader } from "./assets-loader/assets-loader";
import { assetCollection } from "./assets-loader/assets.config";
import { drawBackground } from "./draw/draw-background";
import { drawEntity } from "./draw/draw-entity";
import { drawFloor } from "./draw/entities/draw-floor";
import { centerIsometricDrawing } from "./draw/utils/center-isometric-drawing.util";

export const useMapRenderer = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const { assets, assetSize } = useAssetsLoader(assetCollection);

  const render = (
    map: GameEntity["map"],
    playableEntities: GameEntity["playableEntities"],
  ) => {
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

    context.restore();
  };

  const canRender = canvas && context && assets !== null;

  return {
    render: canRender ? render : null,
    assetSize,
  };
};

const shouldSkipTileRendering = ({ tile }: { tile: Tile }): boolean => {
  return tile.entities.some(
    (entity) =>
      entity.type === "non-playable-non-interactive-entity" &&
      entity.kind === "off-map",
  );
};

const orderingMap: Readonly<Record<TileEntity["type"], number>> = {
  "non-playable-non-interactive-entity": 1,
  "non-playable-interactive-entity": 2,
  "playable-entity": 3,
};

const getTileEntitiesSorted = (entities: TileEntity[]) => {
  return [...entities].sort(
    (a, b) => orderingMap[a.type] - orderingMap[b.type],
  );
};
