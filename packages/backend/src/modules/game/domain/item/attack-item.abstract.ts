import { AttackRangeType, canAttackTarget } from "@dnd/shared";
import { z } from "zod";
import { Attack } from "../attack/attack.entity";
import { AttackError } from "../attack/attack.error";
import { Board } from "../board/board.entity";
import { Coord } from "../coord/coord.vo";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Item } from "./item.abstract";
import { ItemError } from "./item.error";

type Data = {
  readonly type: "Weapon" | "Spell";
  readonly name: string;
  readonly level: number;
  readonly attacks: Array<Attack>;
};

export abstract class AttackItem<
  ChildData extends Data = Data,
> extends Item<ChildData> {
  protected static attackItemBaseSchema = Item.baseSchema.merge(
    z.object({
      type: z.enum(["Weapon", "Spell"]),
      attacks: z.array(z.instanceof(Attack)),
    }),
  );

  public abstract mustValidateAttack({
    attacker,
    defender,
    attackId,
    board,
  }: {
    attacker: Playable;
    defender: Playable;
    attackId: Attack["id"];
    board: Board;
  }): void;

  public abstract getAttackResult({
    attacker,
    attackId,
  }: { attacker: Playable; attackId: Attack["id"] }): {
    type: AttackItem["type"];
    attackResult: ReturnType<Attack["roll"]>;
  };

  public hasAttack({ attackId }: { attackId: Attack["id"] }) {
    return this._data.attacks.some((attack) => attack.id === attackId);
  }

  public override use({
    attackId,
  }: { attackId: Attack["id"] }): ReturnType<Attack["roll"]> {
    const attack = this.getAttackOrThrow({ attackId });
    return attack.roll();
  }

  public getAttackOrThrow({ attackId }: { attackId: Attack["id"] }) {
    const attack = this._data.attacks.find(({ id }) => id === attackId);
    if (!attack) {
      throw new ItemError({
        name: "ATTACK_NOT_FOUND",
        message: `"Attack does not exists on this ${this.type}"`,
      });
    }
    return attack;
  }

  protected mustHaveTargetInRange({
    attacker,
    range,
    targetCoord,
    board,
  }: {
    attacker: Playable;
    range: AttackRangeType;
    targetCoord: Coord;
    board: Board;
  }) {
    const plainBoard = board.toPlain();

    if (
      !canAttackTarget({
        ally: attacker.faction,
        gameBoard: plainBoard as any,
        attackerCoord: attacker.coord.toPlain(),
        range,
        targetCoord,
      })
    ) {
      throw new AttackError({
        name: "TARGET_OUT_OF_RANGE",
        message: "Target is out of range",
      });
    }
  }
}
