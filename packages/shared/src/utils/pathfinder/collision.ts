import { GameEntity, PlayableEntity, Tile } from "../../database";

export function canMoveToRequestedPosition({ tile }: { tile: Tile }) {
  return tile.entities.every(
    (entity) => entity.type !== "playable-entity" && !entity.isBlocking,
  );
}

export function isBlockedByNonPlayableEntity({ tile }: { tile: Tile }) {
  return tile.entities.some(
    (entity) => entity.type !== "playable-entity" && entity.isBlocking,
  );
}

export function isBlockedByNonAllyEntity({
  game,
  tile,
  ally,
}: { game: GameEntity; tile: Tile; ally: PlayableEntity["type"] }) {
  return tile.entities.some(
    (entity) =>
      entity.type === "playable-entity" &&
      game.playableEntities[entity.id]?.type !== ally &&
      game.playableEntities[entity.id]?.isBlocking,
  );
}
