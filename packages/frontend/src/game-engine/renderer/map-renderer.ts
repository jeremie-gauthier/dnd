import { GameEntity } from "@dnd/shared";
import { RefObject } from "react";
import { useAssetsLoader } from "./assets-loader/assets-loader";
import { assetCollection } from "./assets-loader/assets.config";
import { drawBackground } from "./draw/draw-background";
import { drawTilesBackground } from "./draw/draw-tiles-background";
import { useMapRendererOptions } from "./map-renderer-options";
import { useSelectEntityRenderer } from "./select-entity-renderer";

export const useMapRenderer = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const assets = useAssetsLoader(assetCollection);

  const options = useMapRendererOptions();

  const selectEntityRenderer = useSelectEntityRenderer(canvasRef);

  const render = (map: GameEntity["map"]) => {
    if (!canvas || !context || !assets) return;

    drawBackground({
      context,
      canvasHeight: canvas.height,
      canvasWidth: canvas.width,
    });
    drawTilesBackground({
      context,
      mapHeight: map.height,
      mapWidth: map.width,
      options,
    });

    for (const tile of map.tiles) {
      for (const entity of tile.entities) {
        const entityRenderer = selectEntityRenderer.getRenderer(entity);
        if (entityRenderer) {
          entityRenderer({
            context,
            entity,
            entityColumn: tile.coord.column,
            entityRow: tile.coord.row,
            options: { tileSize: options.tileSize },
            assets,
          });
        }
      }
    }
  };

  return { render, options };
};
