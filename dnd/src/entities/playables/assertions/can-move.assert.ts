import type { Tile } from '../../../map/tile';
import { CannotMoveToTileError } from '../errors/cannot-move-to-tile-error';
import { InvalidPathError } from '../errors/invalid-path-error';
import { NotEnoughSpeedError } from '../errors/not-enough-speed-error';
import type { PlayableEntity } from '../playable.abstract';

export function assertCanMoveThroughTiles(
  playableEntity: PlayableEntity,
  tiles: Tile[],
) {
  assertHasEnoughSpeed(playableEntity.speed, tiles.length);
  assertAllTilesAdjacent(tiles);
  assertAllTilesAreAccessible(playableEntity.type, tiles);
}

function assertHasEnoughSpeed(
  playableEntitySpeed: PlayableEntity['speed'],
  speedRequired: number,
) {
  if (playableEntitySpeed < speedRequired) {
    throw new NotEnoughSpeedError();
  }
}

function assertAllTilesAdjacent(tiles: Tile[]) {
  const allTilesAdjacent = tiles.every((tile, tileIndex, tiles) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    tileIndex > 0 ? tile.coord.isNextTo(tiles[tileIndex - 1]!.coord) : true,
  );
  if (!allTilesAdjacent) {
    throw new InvalidPathError();
  }
}

function assertAllTilesAreAccessible(
  allies: PlayableEntity['type'],
  tiles: Tile[],
) {
  const allTilesAccessible = tiles.every(
    (tile) => tile.getBlockingNonAllyEntity(allies) === undefined,
  );
  if (!allTilesAccessible) {
    throw new CannotMoveToTileError();
  }
}
