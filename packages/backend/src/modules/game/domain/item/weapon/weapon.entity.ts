import { AttackRange, AttackType } from "@dnd/shared";
import { z } from "zod";
import { Attack } from "../../attack/attack.entity";
import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { AttackItem } from "../attack-item.abstract";
import { WeaponError } from "./weapon.error";

type Data = {
  readonly type: "Weapon";
  readonly name: string;
  readonly level: number;
  readonly attacks: Array<Attack>;
};

export class Weapon extends AttackItem<Data> {
  private static readonly schema = AttackItem.attackItemBaseSchema.merge(
    z.object({
      type: z.literal("Weapon").optional().default("Weapon"),
    }),
  );

  constructor(rawData: Omit<Data, "type">) {
    const data = Weapon.schema.parse(rawData);
    super(data);
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
  }

  public override getAttackResult({
    attacker,
    attackId,
  }: { attacker: Playable; attackId: Attack["id"] }): {
    type: AttackItem["type"];
    attackResult: ReturnType<Attack["roll"]>;
  } {
    return {
      type: this.type,
      attackResult: attacker.getWeaponAttackResult({
        attackId,
        weapon: this,
      }),
    };
  }

  public canAttackInMelee() {
    return this._data.attacks.find(
      (attack) =>
        (attack.type === AttackType.REGULAR &&
          attack.range === AttackRange.MELEE) ||
        attack.range === AttackRange.VERSATILE,
    );
  }

  public getRegularAttackOrThrow() {
    const regularAttack = this._data.attacks.find(
      (attack) => attack.type === AttackType.REGULAR,
    );
    if (!regularAttack) {
      throw new WeaponError({
        name: "ATTACK_NOT_FOUND",
        message: `Regular Attack not found on Weapon "${this._data.name}"`,
      });
    }
    return regularAttack;
  }

  public override toPlain() {
    return {
      type: this._data.type,
      name: this._data.name,
      level: this._data.level,
      attacks: this._data.attacks.map((attack) => attack.toPlain()),
    };
  }
}
