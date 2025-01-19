import { ItemManaCostJson } from "@dnd/shared";
import { z } from "zod";
import { Attack } from "../../attack/attack.entity";
import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { AttackItem } from "../attack-item.abstract";

type Data = {
  readonly type: "Spell";
  readonly name: string;
  readonly level: number;
  readonly attacks: Array<Attack>;
  readonly manaCost: ItemManaCostJson;
};

export class Spell extends AttackItem<Data> {
  private static schema = AttackItem.attackItemBaseSchema.merge(
    z.object({
      type: z.literal("Spell").optional().default("Spell"),
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

  public get manaCost() {
    return this._data.manaCost;
  }

  public override mustValidateAttack({
    attacker,
    defender,
    attackId,
    board,
  }: {
    attacker: Playable;
    defender: Playable;
    attackId: Attack["id"];
    board: Board;
  }): void {
    const attack = this.getAttackOrThrow({ attackId });
    this.mustHaveTargetInRange({
      attacker,
      range: attack.range,
      targetCoord: defender.coord,
      board,
    });

    const manaCost = attacker.getSpellManaCost({ spell: this });
    attacker.mustHaveEnoughManaPoints({ required: manaCost });
  }

  public override getAttackResult({
    attacker,
    attackId,
  }: { attacker: Playable; attackId: Attack["id"] }): {
    type: AttackItem["type"];
    attackResult: ReturnType<Attack["roll"]>;
  } {
    const attackResult = attacker.getSpellAttackResult({
      attackId,
      spell: this,
    });

    const manaCost = attacker.getSpellManaCost({ spell: this });
    attacker.consumeMana({ amount: manaCost });

    return {
      type: this.type,
      attackResult,
    };
  }

  public override toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
      attacks: this._data.attacks.map((attack) => attack.toPlain()),
      manaCost: this._data.manaCost,
    };
  }
}
