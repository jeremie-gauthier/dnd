import { Graphics as PixiGraphics } from "@pixi/graphics";
import { Container, Graphics, Stage } from "@pixi/react";
import {
  CanvasHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import { Canvas } from "./canvas/canvas";

function App() {
  return (
    <div>
      <Canvas
        height={1000}
        width={1000}
        onClick={(evt) => {
          console.log(evt);
        }}
      />
      <PixiCanvas height={1000} width={1000} />
    </div>
  );
}

export default App;

type Tile = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
};

const Canvas2 = (
  props: CanvasHTMLAttributes<HTMLCanvasElement> & {
    height: number;
    width: number;
  }
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const map = {
    width: 11,
    height: 11,
  };

  const canvasHeight = props.height;
  const canvasWidth = props.width;

  const [tiles, setTiles] = useState<Tile[]>(() => {
    const tiles: Tile[] = [];
    const tileWidth = canvasWidth / map.width;
    const tileHeight = canvasHeight / map.height;

    for (let w = 0; w < map.width; w++) {
      for (let h = 0; h < map.height; h++) {
        const x = tileWidth * w;
        const y = tileHeight * h;

        tiles.push({
          x,
          y,
          w: tileWidth,
          h: tileHeight,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        });
      }
    }

    return tiles;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = "#000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    for (const tile of tiles) {
      context.fillStyle = tile.color;
      context.fillRect(tile.x, tile.y, tile.w, tile.h);
    }
  }, []);

  const handleCanvasClick = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    console.log(evt);
  };

  return (
    <canvas
      ref={canvasRef}
      {...props}
      onClick={(evt) => handleCanvasClick(evt)}
    />
  );
};

const PixiCanvas = ({ height, width }: { height: number; width: number }) => {
  const map = {
    width: 11,
    height: 11,
  };

  const canvasHeight = height;
  const canvasWidth = width;

  const [tiles, setTiles] = useState<Tile[]>(() => {
    const tiles: Tile[] = [];
    const tileWidth = canvasWidth / map.width;
    const tileHeight = canvasHeight / map.height;

    for (let w = 0; w < map.width; w++) {
      for (let h = 0; h < map.height; h++) {
        const x = tileWidth * w;
        const y = tileHeight * h;

        tiles.push({
          x,
          y,
          w: tileWidth,
          h: tileHeight,
          color: parseInt(
            Math.floor(Math.random() * 16777215).toString(16),
            16
          ),
        });
      }
    }

    return tiles;
  });

  const draw = useCallback(
    (g: PixiGraphics) => {
      for (const tile of tiles) {
        g.beginFill(tile.color, 1);
        g.drawRect(tile.x, tile.y, tile.w, tile.h);
        g.endFill();
      }
    },
    [tiles]
  );

  return (
    <Stage width={width} height={height} options={{ backgroundColor: 0xf00 }}>
      <Container position={[0, 0]}>
        <Graphics
          draw={draw}
          onclick={(evt) => {
            console.log(evt);
          }}
        />
      </Container>
    </Stage>
  );
};
