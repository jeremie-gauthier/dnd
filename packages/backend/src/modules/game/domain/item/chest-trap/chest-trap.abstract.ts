import { z } from "zod";
import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Item } from "../item.abstract";

type Data = {
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
};

export abstract class ChestTrap extends Item<Data> {
  private static schema = z.object({
    type: z.literal("ChestTrap").optional().default("ChestTrap"),
    name: z.enum([
      "dazzling_light_1",
      "call_from_the_grave_1",
      "brutal_betrayal_1",
      "blanket_of_flames_1",
      "magic_loss_1",
      "smothering_mist_1",
      "voices_of_the_damned_1",
    ]),
    level: z.number().min(0).max(3),
  });

  constructor(rawData: Omit<Data, "type">) {
    const data = ChestTrap.schema.parse(rawData);
    super(data);
  }

  public abstract use(_: {
    entityThatOpenedTheChest: Hero;
    game: Game;
  }): void;

  public toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
    };
  }
}
