import { z } from "zod";
import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Item } from "../item.abstract";

type Data = {
  readonly type: "Potion";
  readonly name: string;
  readonly level: number;
};

export abstract class Potion extends Item<Data> {
  private static readonly schema = Item.baseSchema.merge(
    z.object({
      type: z.literal("Potion").optional().default("Potion"),
    }),
  );

  constructor(rawData: Omit<Data, "type">) {
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
    };
  }
}
