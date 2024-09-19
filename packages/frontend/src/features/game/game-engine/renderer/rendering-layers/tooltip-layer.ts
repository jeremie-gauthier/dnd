import { RefObject } from "react";
import { GameEventManager } from "../../events";
import { useAssetsLoader } from "../assets-loader/assets-loader";
import { tooltipsAssetsCollection } from "../assets-loader/assets.config";
import { Coord, GameView } from "@dnd/shared";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";
import { centerIsometricDrawing } from "../draw/utils/center-isometric-drawing.util";
import { drawMoveForbiddenTooltip } from "../draw/tooltips/draw-move-forbidden";

type Params = {
  gameEventManager: GameEventManager;
  canvasRef: RefObject<HTMLCanvasElement>;
};
export const useTooltipLayer = ({ canvasRef }: Params) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const { assets, assetSize } = useAssetsLoader(tooltipsAssetsCollection);

  const clear = () => {
    if (!canvas || !context || !assets) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const renderMoveForbiddenTooltip = ({
    map,
    coord2D,
  }: {
    map: GameView["map"];
    coord2D: Coord;
  }) => {
    if (!canvas || !context || !assets) return;

    const config = { assets, assetSize, map };

    const coordIsometric = translate2DToIsometricCoord(coord2D, {
      assetSize,
      // Beware of the offset, it may shift everything being computed here.
      // We really want to have the tiles next to the borders of the canvas.
      map: {
        height: map.height * assetSize,
        width: map.width * assetSize,
      },
    });

    clear();

    context.save();

    centerIsometricDrawing({ context, map, assetSize });

    drawMoveForbiddenTooltip({
      context,
      config,
      subject: { coord2D, coordIsometric },
    });

    context.restore();
  };

  return { clear, renderMoveForbiddenTooltip };
};
