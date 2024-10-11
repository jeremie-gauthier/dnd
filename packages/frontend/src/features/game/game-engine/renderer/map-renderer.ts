import type { GameView, PlayerGamePhase } from "@dnd/shared";
import { RefObject } from "react";
import { GameEventManager } from "../events";
import { useAssetsLoader } from "./assets-loader/assets-loader";
import { assetCollection } from "./assets-loader/assets.config";
import { useEntitiesLayer } from "./rendering-layers/entities-layer";
import { useFloorLayer } from "./rendering-layers/floor-layer";
import { usePreviewLayer } from "./rendering-layers/preview-layer";
import { useTooltipLayer } from "./rendering-layers/tooltip-layer";

type Params = {
  gameEventManager: GameEventManager;
  floorCanvasRef: RefObject<HTMLCanvasElement>;
  previewCanvasRef: RefObject<HTMLCanvasElement>;
  entitiesCanvasRef: RefObject<HTMLCanvasElement>;
  tooltipsLayerRef: RefObject<SVGSVGElement>;
};

export const useMapRenderer = ({
  gameEventManager,
  floorCanvasRef,
  previewCanvasRef,
  entitiesCanvasRef,
  tooltipsLayerRef,
}: Params) => {
  const canvas = floorCanvasRef.current;
  const context = canvas?.getContext("2d");
  const { assets, assetSize } = useAssetsLoader(assetCollection);

  const { render: renderFloorLayer } = useFloorLayer({
    canvasRef: floorCanvasRef,
  });

  const {
    renderMovePreview,
    renderAttackPreview,
    renderPlayableEntityTurnHighlight,
    clear: clearPreviewLayer,
  } = usePreviewLayer({
    gameEventManager,
    canvasRef: previewCanvasRef,
  });

  const { render: renderEntitiesLayer } = useEntitiesLayer({
    canvasRef: entitiesCanvasRef,
  });

  const { clear: clearTooltipLayer, renderMoveForbiddenTooltip } =
    useTooltipLayer({ gameEventManager, layerRef: tooltipsLayerRef });

  const render = (
    map: GameView["map"],
    playableEntities: GameView["playableEntities"],
    _: PlayerGamePhase,
  ) => {
    renderFloorLayer({ map });
    renderEntitiesLayer({ map, playableEntities });
  };

  const canRender = canvas && context && assets !== null;

  return {
    render: canRender ? render : null,
    renderAttackPreview,
    renderMovePreview,
    renderPlayableEntityTurnHighlight,
    clearPreviewLayer,
    clearTooltipLayer,
    renderMoveForbiddenTooltip,
    assetSize,
  };
};
