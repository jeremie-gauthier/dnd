import { GameEntity } from "@dnd/shared";
import { RefObject } from "react";
import { translate2DToIsometricCoord } from "../../utils/coords-conversion.util";
import { useAssetsLoader } from "../assets-loader/assets-loader";
import { entitiesAssetsCollection } from "../assets-loader/assets.config";
import { drawEntity } from "../draw/draw-entity";
import { centerIsometricDrawing } from "../draw/utils/center-isometric-drawing.util";

type Params = {
  canvasRef: RefObject<HTMLCanvasElement>;
};

export const useEntitiesLayer = ({ canvasRef }: Params) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");
  const { assets, assetSize } = useAssetsLoader(entitiesAssetsCollection);

  const render = ({
    map,
    playableEntities,
  }: {
    map: GameEntity["map"];
    playableEntities: GameEntity["playableEntities"];
  }) => {
    if (!canvas || !context || !assets) return;

    const config = { assets, assetSize, map };

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();

    centerIsometricDrawing({ context, map, assetSize });

    for (const tile of map.tiles) {
      if (tile.entities.length === 0) continue;

      const coord2D = tile.coord;
      const coordIsometric = translate2DToIsometricCoord(tile.coord, {
        assetSize,
        // Beware of the offset, it may shift everything being computed here.
        // We really want to have the tiles next to the borders of the canvas.
        map: {
          height: map.height * assetSize,
          width: map.width * assetSize,
        },
      });

      for (const entity of tile.entities) {
        drawEntity({
          context,
          config,
          subject: {
            coord2D,
            coordIsometric,
            entity,
          },
          playableEntities,
        });
      }
    }

    context.restore();
  };

  return { render };
};
