import { PlayableEntity } from "src/modules/game/infra/database/entities/game-entity/playable-entity/playable-entity.entity";
import { EntityType } from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { TileEntity } from "../tile-entity.abstract";

type Data = {
  readonly type: "PLAYABLE_ENTITY";
  readonly id: PlayableEntity["id"];
  readonly isBlocking: boolean;
  readonly faction: "hero" | "monster";
};

export class TilePlayableEntity extends TileEntity<Data> {
  constructor(rawData: Omit<Data, "type">) {
    super({ ...rawData, type: EntityType.PLAYABLE_ENTITY });
  }

  public get faction() {
    return this._data.faction;
  }

  public isMonster() {
    return this._data.faction === "monster";
  }

  public isHero() {
    return this._data.faction === "hero";
  }

  public override toPlain() {
    return {
      id: this._data.id,
      type: this._data.type,
      isBlocking: this._data.isBlocking,
      faction: this._data.faction,
    };
  }
}
