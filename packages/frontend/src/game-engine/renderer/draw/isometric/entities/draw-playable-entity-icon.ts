import { PlayableEnemyEntity, PlayableHeroEntity } from "@dnd/shared";
import { translate2DToIsometricCoord } from "../../../../utils/coords-conversion.util";
import { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawPlayableEntityIcon({
  context,
  entity,
  entityColumn,
  entityRow,
  playableEntity,
  assets,
}: EntityDrawerParams) {
  if (entity.type !== "playable-entity" || playableEntity === undefined) return;

  const isometricCoord = translate2DToIsometricCoord({
    row: entityRow,
    column: entityColumn,
  });

  const playableEntityAsset = getPlayableEntityAsset({
    playableEntity,
    assets,
  });

  context.drawImage(
    playableEntityAsset,
    isometricCoord.column,
    isometricCoord.row,
  );
}

function getPlayableEntityAsset({
  playableEntity,
  assets,
}: Required<
  Pick<EntityDrawerParams, "playableEntity" | "assets">
>): HTMLImageElement {
  switch (playableEntity.type) {
    case "enemy":
      return getEnemyAsset({ enemyEntity: playableEntity, assets });
    case "hero":
      return getHeroAsset({ heroEntity: playableEntity, assets });
  }
}

function getHeroAsset({
  heroEntity,
  assets,
}: {
  heroEntity: PlayableHeroEntity;
  assets: EntityDrawerParams["assets"];
}): HTMLImageElement {
  switch (heroEntity.class) {
    // TODO: add all supported classes
    default:
      return assets.warrior_icon;
  }
}

function getEnemyAsset({
  enemyEntity,
  assets,
}: {
  enemyEntity: PlayableEnemyEntity;
  assets: EntityDrawerParams["assets"];
}): HTMLImageElement {
  switch (enemyEntity.kind) {
    case "goblin":
      return assets.goblin_icon;
  }
}
