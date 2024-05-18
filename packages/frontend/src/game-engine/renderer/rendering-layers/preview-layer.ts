import { Coord, GameEntity, Tile } from "@dnd/shared";
import { RefObject } from "react";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";
import { useAssetsLoader } from "../assets-loader/assets-loader";
import { previewsAssetsCollection } from "../assets-loader/assets.config";
import { drawMovePreview } from "../draw/layers/draw-move-preview";
import { centerIsometricDrawing } from "../draw/utils/center-isometric-drawing.util";

type Params = {
  canvasRef: RefObject<HTMLCanvasElement>;
};

export const usePreviewLayer = ({ canvasRef }: Params) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const { assets, assetSize } = useAssetsLoader(previewsAssetsCollection);

  const clear = () => {
    if (!canvas || !context || !assets) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const renderMovePreview = ({
    map,
    coords,
  }: {
    map: GameEntity["map"];
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

      drawMovePreview({
        context,
        config,
        subject: {
          coord2D,
          coordIsometric,
          tile: {} as Tile,
        },
      });
    }

    context.restore();
  };

  return { renderMovePreview, clear };
};
