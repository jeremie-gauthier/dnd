import { Board, PlayerStatus } from "@/openapi/dnd-api";
import { PlayableEntity } from "@features/game/interfaces/dnd-api/playable-entity.interface";
import { RefObject } from "react";
import { GameEventManager } from "../events";
import { useAssetsLoader } from "./assets-loader/assets-loader";
import { assetCollection } from "./assets-loader/assets.config";
import { useEntitiesLayer } from "./rendering-layers/entities-layer";
import { useFloorLayer } from "./rendering-layers/floor-layer";
import { usePreviewLayer } from "./rendering-layers/preview-layer";

type Params = {
  gameEventManager: GameEventManager;
  floorCanvasRef: RefObject<HTMLCanvasElement>;
  previewCanvasRef: RefObject<HTMLCanvasElement>;
  entitiesCanvasRef: RefObject<HTMLCanvasElement>;
  entityPlaying?: PlayableEntity;
};

export const useMapRenderer = ({
  gameEventManager,
  floorCanvasRef,
  previewCanvasRef,
  entitiesCanvasRef,
  entityPlaying,
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

  const render = (
    map: Board,
    playableEntities: PlayableEntity[],
    _: PlayerStatus,
  ) => {
    renderFloorLayer({ map, entityPlaying });
    renderEntitiesLayer({ map, playableEntities });
  };

  const canRender = canvas && context && assets !== null;

  return {
    render: canRender ? render : null,
    renderAttackPreview,
    renderMovePreview,
    renderPlayableEntityTurnHighlight,
    clearPreviewLayer,
    assetSize,
  };
};
