import { PlayableEntity } from "../playable-entity/playable.type";

export type TilePlayableEntity = {
  type: "playable-entity";
  id: PlayableEntity["id"];
};
