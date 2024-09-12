import {
  GameView,
  PlayableEntity,
  Tile,
  coordToIndex,
  getNeighbourCoords,
} from "@dnd/shared";

type Params = {
  isPlaying: boolean;
  entityPlaying: PlayableEntity | undefined;
  game: GameView;
};

export const useGetNeighbourTiles = ({
  isPlaying,
  entityPlaying,
  game,
}: Params): Tile[] | undefined => {
  if (!isPlaying || !entityPlaying) return;
  const metadata = { width: game.map.width, height: game.map.height };

  const neighbourCoords = getNeighbourCoords({ coord: entityPlaying.coord });
  const neighbourTiles = neighbourCoords
    .map((coord) => {
      const tileIdx = coordToIndex({ coord, metadata });
      return game.map.tiles[tileIdx];
    })
    .filter((tile) => tile !== undefined);

  return neighbourTiles;
};
