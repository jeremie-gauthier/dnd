import { Tile } from "../../database";

export function canMoveToRequestedPosition({ tile }: { tile: Tile }) {
  return tile.entities.every(
    (entity) => entity.type !== "playable-entity" && !entity.isBlocking,
  );
}
