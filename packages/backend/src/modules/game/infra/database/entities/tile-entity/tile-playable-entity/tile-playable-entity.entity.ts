export class TilePlayableEntity {
  type: "playable-entity";
  id: string;
  faction: "hero" | "monster";
  isBlocking: boolean;
}
