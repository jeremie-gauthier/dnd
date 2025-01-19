import { ItemManaCostJson } from "@dnd/shared";
import { z } from "zod";
import { Attack } from "../../attack/attack.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Item } from "../item.abstract";
import { SpellError } from "./spell.error";

type Data = {
  readonly type: "Spell";
  readonly name: string;
  readonly level: number;
  readonly attacks: Array<Attack>;
  readonly manaCost: ItemManaCostJson;
};

export class Spell extends Item<Data> {
  private static schema = Item.baseSchema.merge(
    z.object({
      type: z.literal("Spell").optional().default("Spell"),
      attacks: z.array(z.instanceof(Attack)),
      manaCost: z.object({
        CLERIC: z.number().min(0).optional(),
        SORCERER: z.number().min(0).optional(),
      }),
    }),
  );

  constructor(rawData: Omit<Data, "type">) {
    const data = Spell.schema.parse(rawData);
    super(data);
  }

  get type() {
    return this._data.type;
  }

  public hasAttack({ attackId }: { attackId: Attack["id"] }) {
    return this._data.attacks.some((attack) => attack.id === attackId);
  }

  public use({
    attackId,
  }: { attackId: Attack["id"] }): ReturnType<Attack["roll"]> {
    const attack = this.getAttackOrThrow({ attackId });
    return attack.roll();
  }

  public getAttackOrThrow({ attackId }: { attackId: Attack["id"] }) {
    const attack = this._data.attacks.find(({ id }) => id === attackId);
    if (!attack) {
      throw new Error("Attack does not exists on this Spell");
    }
    return attack;
  }

  public getManaCost({ playableEntity }: { playableEntity: Playable }): number {
    if (playableEntity.isHero()) {
      const manaCost = this._data.manaCost[playableEntity.class];
      if (!manaCost) {
        throw new SpellError({
          name: "CANNOT_CAST_SPELL",
          message: `A ${playableEntity.class} cannot cast spell ${this.id}`,
        });
      }
      return manaCost;
    } else if (playableEntity.isMonster()) {
      return 0;
    } else {
      throw new SpellError({
        name: "CANNOT_CAST_SPELL",
        message: `Playable entity ${playableEntity.id} cannot cast spell ${this.id}`,
      });
    }
  }

  public toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
      attacks: this._data.attacks.map((attack) => attack.toPlain()),
      manaCost: this._data.manaCost,
    };
  }
}
