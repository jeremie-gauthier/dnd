import { TileEntityType } from "@/openapi/dnd-api";
import {
  HeroClass,
  type PlayableEnemyEntity,
  PlayableEntityRace,
  type PlayableHeroEntity,
} from "@dnd/shared";
import { entitiesAssetsCollection } from "../../assets-loader/assets.config";
import { getElevationOffset } from "../utils/get-elevation-offset.util";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

type RequiredAssets = typeof entitiesAssetsCollection;

export function drawPlayableEntityIcon({
  context,
  config,
  subject,
}: EntityDrawerParams<RequiredAssets>) {
  if (
    subject.entity.type !== TileEntityType.PLAYABLE_ENTITY ||
    subject.playableEntity === undefined
  )
    return;

  const playableEntityAsset = getPlayableEntityAsset({
    playableEntity: subject.playableEntity,
    assets: config.assets,
  });

  if (
    subject.playableEntity.faction === "hero" &&
    subject.playableEntity.class === HeroClass.THIEF
  ) {
    context.drawImage(
      playableEntityAsset,
      subject.coordIsometric.column,
      subject.coordIsometric.row -
        getElevationOffset({
          options: {
            assetHeight: config.assetSize,
          },
          elevationLevel: 0.5,
        }),
    );
  } else {
    context.drawImage(
      playableEntityAsset,
      subject.coordIsometric.column,
      subject.coordIsometric.row,
    );
  }
}

function getPlayableEntityAsset({
  playableEntity,
  assets,
}: Required<
  Pick<EntityDrawerParams["subject"], "playableEntity"> &
    Pick<EntityDrawerParams<RequiredAssets>["config"], "assets">
>): HTMLImageElement {
  switch (playableEntity.faction) {
    case "monster":
      return getEnemyAsset({ enemyEntity: playableEntity, assets });
    case "hero":
      return getHeroAsset({ heroEntity: playableEntity, assets });
    default:
      return assets.unknown_icon;
  }
}

function getHeroAsset({
  heroEntity,
  assets,
}: {
  heroEntity: PlayableHeroEntity;
  assets: EntityDrawerParams<RequiredAssets>["config"]["assets"];
}): HTMLImageElement {
  switch (heroEntity.class) {
    case HeroClass.WARRIOR:
      return assets.warrior_icon;
    case HeroClass.SORCERER:
      return assets.sorcerer_icon;
    case HeroClass.CLERIC:
      return assets.cleric_icon;
    case HeroClass.THIEF:
      return assets.thief_bottom_left;
    default:
      return assets.unknown_icon;
  }
}

function getEnemyAsset({
  enemyEntity,
  assets,
}: {
  enemyEntity: PlayableEnemyEntity;
  assets: EntityDrawerParams<RequiredAssets>["config"]["assets"];
}): HTMLImageElement {
  switch (enemyEntity.race) {
    case PlayableEntityRace.GOBLIN:
      return assets.goblin_icon;
    default:
      return assets.unknown_icon;
  }
}
