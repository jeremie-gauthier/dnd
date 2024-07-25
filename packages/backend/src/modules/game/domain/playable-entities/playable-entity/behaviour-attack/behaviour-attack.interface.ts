import { Attack } from "../../../attack/attack.entity";
import { Spell } from "../../../item/spell/spell.entity";
import { Weapon } from "../../../item/weapon/weapon.entity";

type AttackResult = ReturnType<Attack["roll"]>;

export interface BehaviourAttack {
  getWeaponAttackResult(_: {
    weapon: Weapon;
    attackId: Attack["id"];
  }): AttackResult;
  getSpellAttackResult(_: {
    spell: Spell;
    attackId: Attack["id"];
  }): AttackResult;
}
