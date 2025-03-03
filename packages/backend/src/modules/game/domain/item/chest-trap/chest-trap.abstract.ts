import { ItemType } from "src/modules/game/infra/database/enums/item-type.enum";
import { z } from "zod";
import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { ItemPerk } from "../item-perk";
import { Item } from "../item.abstract";

export type ChestTrapData = {
  readonly type: "ChestTrap";
  readonly name:
    | "dazzling_light_1"
    | "call_from_the_grave_1"
    | "brutal_betrayal_1"
    | "blanket_of_flames_1"
    | "magic_loss_1"
    | "smothering_mist_1"
    | "voices_of_the_damned_1";
  readonly level: number;
  readonly itemPerks: Array<ItemPerk>;
};

export abstract class ChestTrap extends Item<ChestTrapData> {
  private static readonly schema = Item.baseSchema.merge(
    z.object({
      type: z
        .literal(ItemType.CHESTTRAP)
        .optional()
        .default(ItemType.CHESTTRAP),
      name: z.enum([
        "dazzling_light_1",
        "call_from_the_grave_1",
        "brutal_betrayal_1",
        "blanket_of_flames_1",
        "magic_loss_1",
        "smothering_mist_1",
        "voices_of_the_damned_1",
      ]),
    }),
  );

  constructor(rawData: Omit<ChestTrapData, "type">) {
    const data = ChestTrap.schema.parse(rawData);
    super(data);
  }

  public abstract use(_: {
    entityThatOpenedTheChest: Hero;
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
