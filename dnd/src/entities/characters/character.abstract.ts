import type { DiceRoll } from '../../dices/dice.abstract';
import type { CharacterClass } from '../../interfaces/character-class.type';
import { Inventory } from '../../inventory/inventory';
import { Item } from '../../inventory/item.abstract';
import { sum } from '../../utils/sum';
import type { Weapon } from '../../weapons/weapon.abstract';
import { Enemy } from '../enemies/enemy.interface';
import type { Entity } from '../entity.interface';

export type AttackResult = [number, DiceRoll[]];

export abstract class Character implements Entity {
  public readonly type = 'character';
  public isBlocking = true;

  abstract readonly class: CharacterClass;
  abstract readonly name: string;
  abstract readonly level: number;
  abstract readonly speed: number;
  abstract readonly initiative: number;
  abstract healthPoints: number;
  abstract readonly healthPointsNatural: number;
  abstract manaPoints: number;
  abstract readonly manaPointsNatural: number;
  abstract armorClass: number;
  abstract readonly armorClassNatural: number;

  abstract readonly inventory: Inventory;

  get isAlive() {
    return this.healthPoints > 0;
  }

  public takeDamage(amount: number): void {
    const damageTaken = amount - this.armorClass;
    if (damageTaken > 0) {
      this.handleDamage(damageTaken);
    }
  }

  public takeDirectDamage(amount: number): void {
    this.handleDamage(amount);
  }

  private handleDamage(damageTaken: number): void {
    this.healthPoints -= damageTaken;
    if (this.healthPoints <= 0) {
      this.healthPoints = 0;
      this.isBlocking = false;
    }
  }

  protected abstract getAttackWithModifiers(
    weapon: Weapon,
    attackResult: AttackResult,
  ): AttackResult;

  // TODO: handle spell casting - with mana cost
  public attack(weapon: Weapon, enemy: Enemy): [number, DiceRoll[]] {
    // ! ensure that the weapon used for attack is equipped
    if (!this.inventory.isWeaponEquipped(weapon)) {
      throw new Error(
        `[-] Character error: Weapon must be equipped to be used for an attack`,
      );
    }

    const diceRolls = weapon.rollAttack();
    const sumDiceRolls = sum(
      ...diceRolls
        .filter(({ type }) => type === 'attack')
        .map(({ value }) => value),
    );

    const diceRollsWithModifiers = this.getAttackWithModifiers(weapon, [
      sumDiceRolls,
      diceRolls,
    ]);

    const [totalDamages] = diceRollsWithModifiers;
    enemy.takeDamage(totalDamages);

    return diceRollsWithModifiers;
  }

  public equip(item: Item): void {
    this.inventory.addItemInBag(item, this.inventory.equipped[item.type]);
  }

  public loot(item: Item): void {
    this.inventory.addItemInBag(item, this.inventory.backpack);
  }

  public getRepresentation() {
    return `This is ${this.name} (${this.type})`;
  }

  public toString() {
    return this.name[0]?.toUpperCase() ?? '';
  }
}
