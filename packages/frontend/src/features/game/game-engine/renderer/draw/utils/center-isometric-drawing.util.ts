import type { GameView } from "@dnd/shared";

type Params = {
  context: CanvasRenderingContext2D;
  map: GameView["map"];
  assetSize: number;
};

export const centerIsometricDrawing = ({
  context,
  map,
  assetSize,
}: Params): void => {
  const size = Math.max(map.width, map.height);
  const halfAssetSize = assetSize / 2;

  // (* halfAssetSize) => un offset pour centrer le canvas
  // (- halfAssetSize) => un offset pour afficher le haut de la premiere TILE en 0,0 sur le canvas
  context.translate(size * halfAssetSize - halfAssetSize, 0);
};
