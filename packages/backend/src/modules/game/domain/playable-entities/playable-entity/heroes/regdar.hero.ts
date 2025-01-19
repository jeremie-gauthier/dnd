import { Attack } from "../../../attack/attack.entity";
import { Spell } from "../../../item/spell/spell.entity";
import { Weapon } from "../../../item/weapon/weapon.entity";
import { PlayableEntityError } from "../playable-entity.error";
import { Hero } from "./hero.abstract";

export class Regdar extends Hero {
  public override getSpellAttackResult(_: {
    spell: Spell;
    attackId: Attack["id"];
  }): ReturnType<Attack["roll"]> {
    throw new PlayableEntityError({
      name: "CANNOT_CAST_SPELL",
      message: "Regdar cannot cast any spell",
    });
  }

  public override getWeaponAttackResult({
    attackId,
    weapon,
  }: { weapon: Weapon; attackId: Attack["id"] }) {
    const result = weapon.use({ attackId });
    for (const condition of this.conditions) {
      condition.onBeforeOutgoingWeaponAttack(result);
    }

    result.sumResult += this.getAttackBonus({ attackId, weapon });
    return result;
  }

  private getAttackBonus({
    attackId,
    weapon,
  }: { weapon: Weapon; attackId: Attack["id"] }) {
    const attack = weapon.getAttackOrThrow({ attackId });
    return attack.range === "melee" ? 1 : 0;
  }
}
