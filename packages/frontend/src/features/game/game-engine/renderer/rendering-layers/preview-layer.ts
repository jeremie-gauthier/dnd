import { Coord, GameView, Tile, getLineOfSight } from "@dnd/shared";
import { RefObject, useEffect } from "react";
import { GameEventManager } from "../../events";
import { PreparingAttackEvent } from "../../events/preparing-attack.event";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";
import { useAssetsLoader } from "../assets-loader/assets-loader";
import { previewsAssetsCollection } from "../assets-loader/assets.config";
import { drawAttackPreview } from "../draw/layers/draw-attack-preview";
import { LayerDrawerParams } from "../draw/layers/layer-drawer-params.interface";
import { centerIsometricDrawing } from "../draw/utils/center-isometric-drawing.util";
import { drawMovePreview } from "../draw/layers/draw-move-preview";

type Params = {
  gameEventManager: GameEventManager;
  canvasRef: RefObject<HTMLCanvasElement>;
};

export const usePreviewLayer = ({ gameEventManager, canvasRef }: Params) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const { assets, assetSize } = useAssetsLoader(previewsAssetsCollection);

  const clear = () => {
    if (!canvas || !context || !assets) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const renderPreview =
    (
      renderer: (_: LayerDrawerParams<typeof previewsAssetsCollection>) => void,
    ) =>
    ({
      map,
      coords,
    }: {
      map: GameView["map"];
      coords: Coord[];
    }) => {
      if (!canvas || !context || !assets) return;

      clear();

      const config = { assets, assetSize, map };

      context.save();

      centerIsometricDrawing({ context, map, assetSize });

      context.globalAlpha = 0.75;

      for (const coord2D of coords) {
        const coordIsometric = translate2DToIsometricCoord(coord2D, {
          assetSize,
          // Beware of the offset, it may shift everything being computed here.
          // We really want to have the tiles next to the borders of the canvas.
          map: {
            height: map.height * assetSize,
            width: map.width * assetSize,
          },
        });

        renderer({
          context,
          config,
          subject: { coord2D, coordIsometric, tile: {} as Tile },
        });
      }

      context.restore();
    };
  const renderAttackPreview = renderPreview(drawAttackPreview);

  const renderMovePreview = ({
    map,
    moveLimitCoords,
    moveSimulationCoords,
  }: {
    map: GameView["map"];
    moveLimitCoords: Coord[];
    moveSimulationCoords: Coord[];
  }) => {
    if (!canvas || !context || !assets) return;

    const drawPreviewOnCoords = ({
      previewCoords,
    }: {
      previewCoords: Coord[];
    }) => {
      const config = { assets, assetSize, map };
      for (const coord2D of previewCoords) {
        const coordIsometric = translate2DToIsometricCoord(coord2D, {
          assetSize,
          // Beware of the offset, it may shift everything being computed here.
          // We really want to have the tiles next to the borders of the canvas.
          map: {
            height: map.height * assetSize,
            width: map.width * assetSize,
          },
        });

        drawMovePreview({
          context,
          config,
          subject: { coord2D, coordIsometric, tile: {} as Tile },
        });
      }
    };

    clear();

    context.save();

    centerIsometricDrawing({ context, map, assetSize });

    context.globalAlpha = 0.75;
    drawPreviewOnCoords({ previewCoords: moveLimitCoords });

    context.globalAlpha = 1;
    drawPreviewOnCoords({ previewCoords: moveSimulationCoords });

    context.restore();
  };

  useEffect(() => {
    const handlePreparingAttackEvent: EventListener = (e) => {
      const { game, entityPlaying, attack } = e as PreparingAttackEvent;

      const tilesInSight = getLineOfSight({
        ally: entityPlaying.faction,
        gameBoard: game.map,
        originCoord: entityPlaying.coord,
        range: attack.range,
      });
      const coordsInSight = tilesInSight.map(
        (tileInSight) => tileInSight.coord,
      );
      renderAttackPreview({ map: game.map, coords: coordsInSight });
    };

    gameEventManager.addEventListener(
      PreparingAttackEvent.EventName,
      handlePreparingAttackEvent,
    );

    return () => {
      gameEventManager.removeEventListener(
        PreparingAttackEvent.EventName,
        handlePreparingAttackEvent,
      );
    };
  }, [
    gameEventManager.addEventListener,
    gameEventManager.removeEventListener,
    renderAttackPreview,
  ]);

  return { renderMovePreview, renderAttackPreview, clear };
};
