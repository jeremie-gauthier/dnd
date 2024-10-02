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
  private static schema = z.object({
    type: z.literal("Potion").optional().default("Potion"),
    name: z.string(),
    level: z.number().min(0).max(3),
  });

  constructor(rawData: Omit<Data, "type">) {
    const data = Potion.schema.parse(rawData);
    super(data);
  }

  public abstract use(_: {
    playableEntity: Hero;
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
