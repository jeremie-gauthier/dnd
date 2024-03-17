import { GameEntity, PlayableEntity } from "@dnd/shared";
import { RefObject } from "react";
import { useAssetsLoader } from "./assets-loader/assets-loader";
import { assetCollectionIsometric } from "./assets-loader/assets.config";
import { drawBackground } from "./draw/draw-background";
import { drawDoor } from "./draw/isometric/entities/draw-door";
import { drawFloor } from "./draw/isometric/entities/draw-floor";
import { drawPillar } from "./draw/isometric/entities/draw-pillar";
import { drawPlayableEntityIcon } from "./draw/isometric/entities/draw-playable-entity-icon";
import { drawWall } from "./draw/isometric/entities/draw-wall";
import { useMapRendererOptions } from "./map-renderer-options";

export const useMapRenderer = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const assets = useAssetsLoader(assetCollectionIsometric);

  const options = useMapRendererOptions();

  // const selectEntityRenderer = useSelectEntityRenderer(canvasRef);

  const render = (map: GameEntity["map"]) => {
    if (!canvas || !context || !assets) return;

    context.save();
    // context.scale(1, 0.5);
    // context.rotate(45);

    drawBackground({
      context,
      canvasHeight: canvas.height,
      canvasWidth: canvas.width,
    });

    const TILE_SIZE = 64;
    const HALF_TILE_SIZE = TILE_SIZE / 2;
    // (* HALF_TILE_SIZE) => un offset pour centrer le canvas
    // (- HALF_TILE_SIZE) => un offset pour afficher le haut de la premiere TILE en 0,0 sur le canvas
    context.translate(map.width * HALF_TILE_SIZE - HALF_TILE_SIZE, 0);

    for (let row = 0; row < 11; row += 1) {
      for (let column = 0; column < 11; column += 1) {
        drawFloor({
          context,
          entityRow: row,
          entityColumn: column,
          assets,
          options,
        });
      }
    }

    for (let row = 0; row < 11; row += 1) {
      if (row === 4) {
        drawDoor({
          context,
          entityRow: row,
          entityColumn: 3,
          assets,
          options,
          entity: {
            type: "non-playable-interactive-entity",
            kind: "door",
            isBlocking: true,
            canInteract: true,
            isVisible: true,
          },
        });
      } else {
        drawWall({
          context,
          entityRow: row,
          entityColumn: 3,
          assets,
          options,
        });
      }
    }

    drawPillar({
      context,
      entityRow: 6,
      entityColumn: 6,
      assets,
      options,
    });

    drawPlayableEntityIcon({
      context,
      entityRow: 9,
      entityColumn: 9,
      assets,
      options,
      entity: {
        type: "playable-entity",
        id: "fake-hero-id",
      },
      playableEntity: {
        type: "hero",
        class: "WARRIOR",
      } as PlayableEntity,
    });

    drawPlayableEntityIcon({
      context,
      entityRow: 8,
      entityColumn: 9,
      assets,
      options,
      entity: {
        type: "playable-entity",
        id: "fake-goblin-id",
      },
      playableEntity: {
        type: "enemy",
        kind: "goblin",
      } as PlayableEntity,
    });

    // for (const tile of map.tiles) {
    //   for (const entity of tile.entities) {
    //     const entityRenderer = selectEntityRenderer.getRenderer(entity);
    //     if (entityRenderer) {
    //       entityRenderer({
    //         context,
    //         entity,
    //         entityColumn: tile.coord.column,
    //         entityRow: tile.coord.row,
    //         options: { tileSize: options.tileSize },
    //         assets,
    //       });
    //     }
    //   }
    // }

    context.restore();
  };

  const canRender = canvas && context && assets !== null;

  return {
    render: canRender ? render : null,
    options,
  };
};
