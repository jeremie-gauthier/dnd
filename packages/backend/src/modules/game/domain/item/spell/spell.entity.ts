import { ItemType } from "src/modules/game/infra/database/enums/item-type.enum";
import {
  SpellCasterHeroClass,
  SpellCasterHeroClassType,
} from "src/modules/game/infra/database/enums/spell-caster-hero-class.enum";
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
  readonly manaCosts: Array<{ class: SpellCasterHeroClassType; cost: number }>;
};

export class Spell extends AttackItem<Data> {
  private static readonly schema = AttackItem.attackItemBaseSchema.merge(
    z.object({
      type: z.literal(ItemType.SPELL).optional().default(ItemType.SPELL),
      manaCosts: z.array(
        z.object({
          class: z.enum([
            SpellCasterHeroClass.CLERIC,
            SpellCasterHeroClass.SORCERER,
          ]),
          cost: z.number().min(0),
        }),
      ),
    }),
  );

  constructor(rawData: Omit<Data, "type">) {
    const data = Spell.schema.parse(rawData);
    super(data);
  }

  public get manaCosts() {
    return this._data.manaCosts;
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
      manaCosts: this._data.manaCosts,
    };
  }
}
