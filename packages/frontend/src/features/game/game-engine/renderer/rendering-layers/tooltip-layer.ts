import { Coord, GameView } from "@dnd/shared";
import { RefObject } from "react";
import { GameEventManager } from "../../events";

type Params = {
  gameEventManager: GameEventManager;
  layerRef: RefObject<SVGSVGElement>;
};
export const useTooltipLayer = ({ layerRef }: Params) => {
  const clear = () => {
    // if (!canvas || !context || !assets) return;
    // context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const renderMoveForbiddenTooltip = (_: {
    map: GameView["map"];
    coord2D: Coord;
  }) => {
    // if (!canvas || !context || !assets) return;
    // const config = { assets, assetSize, map };
    // const coordIsometric = translate2DToIsometricCoord(coord2D, {
    //   assetSize,
    //   // Beware of the offset, it may shift everything being computed here.
    //   // We really want to have the tiles next to the borders of the canvas.
    //   map: {
    //     height: map.height * assetSize,
    //     width: map.width * assetSize,
    //   },
    // });
    // clear();
    // context.save();
    // centerIsometricDrawing({ context, map, assetSize });
    // drawMoveForbiddenTooltip({
    //   context,
    //   config,
    //   subject: { coord2D, coordIsometric },
    // });
    // context.restore();
  };

  return { clear, renderMoveForbiddenTooltip };
};
