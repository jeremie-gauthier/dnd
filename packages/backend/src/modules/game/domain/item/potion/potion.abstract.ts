import { ItemType } from "src/modules/game/infra/database/enums/item-type.enum";
import { z } from "zod";
import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { ItemPerk } from "../item-perk";
import { Item } from "../item.abstract";

export type PotionData = {
  readonly type: "Potion";
  readonly name: string;
  readonly level: number;
  readonly itemPerks: Array<ItemPerk>;
};

export abstract class Potion extends Item<PotionData> {
  private static readonly schema = Item.baseSchema.merge(
    z.object({
      type: z.literal(ItemType.POTION).optional().default(ItemType.POTION),
    }),
  );

  constructor(rawData: Omit<PotionData, "type">) {
    const data = Potion.schema.parse(rawData);
    super(data);
  }

  public abstract use(_: {
    playableEntity: Hero;
    game: Game;
  }): void;

  public override toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
      itemPerks: this._data.itemPerks.map((itemPerk) => itemPerk.toPlain()),
    };
  }
}
