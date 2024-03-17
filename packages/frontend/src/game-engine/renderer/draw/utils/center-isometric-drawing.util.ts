import type { GameEntity } from "@dnd/shared";

type Params = {
  context: CanvasRenderingContext2D;
  map: GameEntity["map"];
  assetSize: number;
};

export const centerIsometricDrawing = ({
  context,
  map,
  assetSize,
}: Params): void => {
  const halfAssetSize = assetSize / 2;

  // (* halfAssetSize) => un offset pour centrer le canvas
  // (- halfAssetSize) => un offset pour afficher le haut de la premiere TILE en 0,0 sur le canvas
  context.translate(map.width * halfAssetSize - halfAssetSize, 0);
};
