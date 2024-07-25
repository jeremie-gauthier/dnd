import { Attack } from "../../../attack/attack.entity";
import { Spell } from "../../../item/spell/spell.entity";
import { Weapon } from "../../../item/weapon/weapon.entity";
import { BehaviourAttack } from "./behaviour-attack.interface";

export class BehaviourAttackMonster implements BehaviourAttack {
  public getSpellAttackResult({
    attackId,
    spell,
  }: { spell: Spell; attackId: Attack["id"] }) {
    const result = spell.use({ attackId });
    return result;
  }

  public getWeaponAttackResult({
    attackId,
    weapon,
  }: { weapon: Weapon; attackId: Attack["id"] }) {
    const result = weapon.use({ attackId });
    return result;
  }
}
