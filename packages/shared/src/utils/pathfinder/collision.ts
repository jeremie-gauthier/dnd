import { PlayableEntity } from "../../database";
import { GameBoardTile } from "./pathfinder.interface";

export function canMoveToRequestedPosition({
  ally,
  tile,
}: { ally: PlayableEntity["faction"]; tile: GameBoardTile }) {
  return tile.entities.every(
    (entity) =>
      !entity.isBlocking ||
      (entity.isBlocking &&
        entity.type === "playable-entity" &&
        entity.faction === ally),
  );
}

export function isBlockedByNonPlayableEntity({
  tile,
}: { tile: GameBoardTile }) {
  return tile.entities.some(
    (entity) => entity.type !== "playable-entity" && entity.isBlocking,
  );
}

export function isBlockedByNonAllyEntity({
  tile,
  ally,
}: { tile: GameBoardTile; ally: PlayableEntity["faction"] }) {
  return tile.entities.some(
    (entity) =>
      entity.type === "playable-entity" &&
      entity.faction !== ally &&
      entity.isBlocking,
  );
}
