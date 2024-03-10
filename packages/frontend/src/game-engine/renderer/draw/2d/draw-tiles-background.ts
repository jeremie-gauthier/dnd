type Params = {
  context: CanvasRenderingContext2D;
  mapHeight: number;
  mapWidth: number;
  options: {
    tileSize: number;
    colors: {
      tactic: {
        tile: {
          background: {
            even: string;
            odd: string;
          };
        };
      };
    };
  };
};

export function drawTilesBackground({
  context,
  mapHeight,
  mapWidth,
  options,
}: Params) {
  // paint all board as if tiles were all odd
  context.fillStyle = options.colors.tactic.tile.background.odd;
  context.fillRect(
    0,
    0,
    mapWidth * options.tileSize,
    mapHeight * options.tileSize,
  );

  // paint only even tiles
  context.fillStyle = options.colors.tactic.tile.background.even;
  for (let row = 0; row < mapHeight; row += 1) {
    const firstEvenTileOnColumn = row % 2 === 0 ? 0 : 1;
    for (let column = firstEvenTileOnColumn; column < mapWidth; column += 2) {
      context.fillRect(
        column * options.tileSize,
        row * options.tileSize,
        options.tileSize,
        options.tileSize,
      );
    }
  }
}
