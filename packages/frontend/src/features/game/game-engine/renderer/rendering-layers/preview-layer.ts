import { Board, CoordResponseDto, Tile } from "@/openapi/dnd-api";
import { getLineOfSight } from "@dnd/shared";
import { RefObject, useEffect } from "react";
import { GameEventManager } from "../../events";
import { PreparingAttackEvent } from "../../events/preparing-attack.event";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";
import { useAssetsLoader } from "../assets-loader/assets-loader";
import { previewsAssetsCollection } from "../assets-loader/assets.config";
import { drawAttackPreview } from "../draw/layers/draw-attack-preview";
import { drawEntityTurnHighlight } from "../draw/layers/draw-entity-turn-highlight";
import { drawMovePreview } from "../draw/layers/draw-move-preview";
import { LayerDrawerParams } from "../draw/layers/layer-drawer-params.interface";
import { centerIsometricDrawing } from "../draw/utils/center-isometric-drawing.util";

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
      map: Board;
      coords: CoordResponseDto[];
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
    map: Board;
    moveLimitCoords: CoordResponseDto[];
    moveSimulationCoords: CoordResponseDto[];
  }) => {
    if (!canvas || !context || !assets) return;

    const config = { assets, assetSize, map };

    clear();

    context.save();

    centerIsometricDrawing({ context, map, assetSize });

    context.globalAlpha = 0.75;
    for (const coord2D of moveLimitCoords) {
      const coordIsometric = translate2DToIsometricCoord(coord2D, config);

      drawMovePreview({
        context,
        config,
        subject: { coord2D, coordIsometric, tile: {} as Tile },
      });
    }
    context.globalAlpha = 1;
    const moveSimulationCoordsWithRangeIndexes: [CoordResponseDto, number][] =
      moveSimulationCoords.map((coord, idx) => [coord, idx + 1]);

    context.textRendering = "optimizeSpeed";
    context.font = "bold 0.825rem Courier";
    for (const [coord2D, moveIndex] of moveSimulationCoordsWithRangeIndexes) {
      const coordIsometric = translate2DToIsometricCoord(coord2D, config);

      drawMovePreview({
        context,
        config,
        subject: { coord2D, coordIsometric, tile: {} as Tile },
      });

      context.fillText(
        `${moveIndex}`,
        coordIsometric.column + assetSize / 2.25,
        coordIsometric.row + assetSize / 3.5,
      );
    }

    context.restore();
  };

  useEffect(() => {
    const handlePreparingAttackEvent: EventListener = (e) => {
      const { game, entityPlaying, attack } = e as PreparingAttackEvent;

      const tilesInSight = getLineOfSight({
        ally: entityPlaying.faction,
        gameBoard: game.board,
        originCoord: entityPlaying.coord,
        range: attack.range,
      });
      const coordsInSight = tilesInSight.map(
        (tileInSight) => tileInSight.coord,
      );
      renderAttackPreview({ map: game.board, coords: coordsInSight });
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

  const renderPlayableEntityTurnHighlight = ({
    map,
    playingEntityCoord,
  }: {
    map: Board;
    playingEntityCoord: CoordResponseDto;
  }) => {
    if (!canvas || !context || !assets) return;

    const config = { assets, assetSize, map };
    clear();

    context.save();

    centerIsometricDrawing({ context, map, assetSize });

    const coordIsometric = translate2DToIsometricCoord(
      playingEntityCoord,
      config,
    );
    drawEntityTurnHighlight({
      context,
      config,
      subject: {
        coord2D: playingEntityCoord,
        coordIsometric,
        tile: {} as Tile,
      },
    });

    context.restore();
  };

  return {
    renderMovePreview,
    renderAttackPreview,
    renderPlayableEntityTurnHighlight,
    clear,
  };
};
