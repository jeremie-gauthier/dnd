import type { GameEntity, PlayableEntity } from "@dnd/shared";
import type { RefObject } from "react";
import { useAssetsLoader } from "./assets-loader/assets-loader";
import { assetCollection } from "./assets-loader/assets.config";
import { drawBackground } from "./draw/draw-background";
import { drawDoor } from "./draw/entities/draw-door";
import { drawFloor } from "./draw/entities/draw-floor";
import { drawPillar } from "./draw/entities/draw-pillar";
import { drawPlayableEntityIcon } from "./draw/entities/draw-playable-entity-icon";
import { drawWall } from "./draw/entities/draw-wall";
import { centerIsometricDrawing } from "./draw/utils/center-isometric-drawing.util";

export const useMapRenderer = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const { assets, assetSize } = useAssetsLoader(assetCollection);

  const render = (map: GameEntity["map"]) => {
    if (!canvas || !context || !assets) return;

    context.save();

    drawBackground({
      context,
      canvasHeight: canvas.height,
      canvasWidth: canvas.width,
    });

    centerIsometricDrawing({ context, map, assetSize });

    for (let row = 0; row < 11; row += 1) {
      for (let column = 0; column < 11; column += 1) {
        drawFloor({
          context,
          entityRow: row,
          entityColumn: column,
          assets,
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
        });
      }
    }

    drawPillar({
      context,
      entityRow: 6,
      entityColumn: 6,
      assets,
    });

    drawPlayableEntityIcon({
      context,
      entityRow: 9,
      entityColumn: 9,
      assets,
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
      entity: {
        type: "playable-entity",
        id: "fake-goblin-id",
      },
      playableEntity: {
        type: "enemy",
        kind: "goblin",
      } as PlayableEntity,
    });

    context.restore();
  };

  const canRender = canvas && context && assets !== null;

  return {
    render: canRender ? render : null,
    assetSize,
  };
};
