import { GameResponseDto, Tile } from "@/openapi/dnd-api";
import { coordToIndex, getNeighbourCoords } from "@dnd/shared";
import { PlayableEntity } from "../interfaces/dnd-api/playable-entity.interface";

type Params = {
  isPlaying: boolean;
  entityPlaying: PlayableEntity | undefined;
  game: GameResponseDto;
};

export const useGetNeighbourTiles = ({
  isPlaying,
  entityPlaying,
  game,
}: Params): Tile[] | undefined => {
  if (!isPlaying || !entityPlaying) return;
  const metadata = { width: game.board.width, height: game.board.height };

  const neighbourCoords = getNeighbourCoords({ coord: entityPlaying.coord });
  const neighbourTiles = neighbourCoords
    .map((coord) => {
      const tileIdx = coordToIndex({ coord, metadata });
      return game.board.tiles[tileIdx];
    })
    .filter((tile) => tile !== undefined);

  return neighbourTiles;
};
