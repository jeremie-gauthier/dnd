import { GameEntity } from "@dnd/shared";
import { RefObject } from "react";
import { drawBackground } from "./draw/draw-background";
import { drawTilesBackground } from "./draw/draw-tiles-background";
import { useMapRendererOptions } from "./map-renderer-options";
import { useSelectEntityRenderer } from "./select-entity-renderer";

export const useMapRenderer = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");

  const options = useMapRendererOptions();

  const selectEntityRenderer = useSelectEntityRenderer(canvasRef);

  const render = (map: GameEntity["map"]) => {
    if (!canvas || !context) return;

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
          });
        }
      }
    }
  };

  return { render, options };
};
