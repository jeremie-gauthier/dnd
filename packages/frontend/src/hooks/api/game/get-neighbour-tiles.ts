import {
  GameView,
  PlayableEntity,
  Tile,
  coordToIndex,
  getNeighbourCoords,
} from "@dnd/shared";

type Params = {
  isPlaying: boolean;
  heroPlaying: PlayableEntity | undefined;
  game: GameView;
};

export const useGetNeighbourTiles = ({
  isPlaying,
  heroPlaying,
  game,
}: Params): Tile[] | undefined => {
  if (!isPlaying || !heroPlaying) return;
  const metadata = { width: game.map.width, height: game.map.height };

  const neighbourCoords = getNeighbourCoords({ coord: heroPlaying.coord });
  const neighbourTiles = neighbourCoords
    .map((coord) => {
      const tileIdx = coordToIndex({ coord, metadata });
      return game.map.tiles[tileIdx];
    })
    .filter((tile) => tile !== undefined);

  return neighbourTiles;
};
