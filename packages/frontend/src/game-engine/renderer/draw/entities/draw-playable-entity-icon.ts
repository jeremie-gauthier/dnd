import type { PlayableEnemyEntity, PlayableHeroEntity } from "@dnd/shared";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

export function drawPlayableEntityIcon({
  context,
  config,
  subject,
}: EntityDrawerParams) {
  if (
    subject.entity.type !== "playable-entity" ||
    subject.playableEntity === undefined
  )
    return;

  const playableEntityAsset = getPlayableEntityAsset({
    playableEntity: subject.playableEntity,
    assets: config.assets,
  });

  context.drawImage(
    playableEntityAsset,
    subject.coordIsometric.column,
    subject.coordIsometric.row,
  );
}

function getPlayableEntityAsset({
  playableEntity,
  assets,
}: Required<
  Pick<EntityDrawerParams["subject"], "playableEntity"> &
    Pick<EntityDrawerParams["config"], "assets">
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
  assets: EntityDrawerParams["config"]["assets"];
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
  assets: EntityDrawerParams["config"]["assets"];
}): HTMLImageElement {
  switch (enemyEntity.kind) {
    case "goblin":
      return assets.goblin_icon;
  }
}
