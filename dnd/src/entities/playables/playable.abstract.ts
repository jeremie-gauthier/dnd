import { AttackType } from '../../interfaces/attack-type.enum';
import { Inventory } from '../../inventory/inventory';
import {
  Weapon,
  WeaponAttackResult,
} from '../../items/weapons/weapon.abstract';
import type { Coord } from '../../map/coord';
import { Tile } from '../../map/tile';
import { Entity } from '../entity.interface';
import {
  EntityEvent,
  entityEventEmitter,
} from '../events/event-emitter.entity';
import type { Character } from './characters/character.abstract';
import type { Enemy } from './enemies/enemy.abstract';
import { CannotMeleeAttackError } from './errors/cannot-melee-attack-error';
import { CannotRangeAttackError } from './errors/cannot-range-attack-error';
import { NotEquippedError } from './errors/not-equipped-error';
import { NotInSightError } from './errors/not-in-sight-error';

export enum PlayableEntityType {
  Character = 'character',
  Enemy = 'Enemy',
}

export abstract class PlayableEntity implements Entity {
  public isBlocking = true;
  public readonly isPlayable = true;

  abstract readonly type: PlayableEntityType;

  abstract readonly name: string;
  abstract readonly description: string;

  public initiative = 0;
  abstract readonly speed: number;
  abstract healthPoints: number;
  abstract readonly healthPointsNatural: number;
  abstract manaPoints: number;
  abstract readonly manaPointsNatural: number;
  abstract armorClass: number;
  abstract readonly armorClassNatural: number;
  abstract readonly inventory: Inventory;

  constructor(public readonly coord: Coord) {}

  get isAlive() {
    return this.healthPoints > 0;
  }

  protected abstract afterDiceRollsHook(
    attackResult: WeaponAttackResult,
    weapon: Weapon,
    target: PlayableEntity,
  ): WeaponAttackResult;

  // TODO: handle spell casting - with mana cost
  public attack(
    weapon: Weapon,
    target: PlayableEntity,
    tilesInSight: Tile[],
  ): WeaponAttackResult {
    this.assertCanAttackTarget(weapon, target, tilesInSight);

    const diceRolls = weapon.rollAttack();

    const diceRollsWithModifiers = this.afterDiceRollsHook(
      diceRolls,
      weapon,
      target,
    );

    const [totalDamages] = diceRollsWithModifiers;
    console.log(
      `${this.name} attacked ${target.name} with ${weapon.name} and inflicted ${totalDamages} damages`,
    );

    // TODO: event emitter ??
    target.takeDamage(totalDamages);

    return diceRollsWithModifiers;
  }

  private assertCanAttackTarget(
    weapon: Weapon,
    target: PlayableEntity,
    tilesInSight: Tile[],
  ) {
    if (!this.inventory.isWeaponEquipped(weapon)) {
      throw new NotEquippedError(weapon);
    }

    if (!tilesInSight.some((tile) => tile.coord.equals(target.coord))) {
      throw new NotInSightError(target);
    }

    if (
      weapon.attackType === AttackType.Melee &&
      !this.coord.isNextTo(target.coord)
    ) {
      throw new CannotMeleeAttackError();
    }

    if (
      weapon.attackType === AttackType.Range &&
      this.coord.isNextTo(target.coord)
    ) {
      throw new CannotRangeAttackError();
    }
  }

  public takeDamage(amount: number): void {
    const damageTaken = amount - this.armorClass;
    console.log(
      `${this.name} lost ${Math.max(damageTaken, 0)} HP (${
        this.armorClass
      } absorbed)`,
    );
    if (damageTaken > 0) {
      this.handleDamage(damageTaken);
    }
  }

  public takeDirectDamage(amount: number): void {
    this.handleDamage(amount);
  }

  private handleDamage(damageTaken: number): void {
    this.healthPoints -= damageTaken;
    console.log(`${this.name} has ${this.healthPoints} HP left`);
    if (this.healthPoints <= 0) {
      console.log(`${this.name} is dead`);
      this.healthPoints = 0;
      this.isBlocking = false;

      entityEventEmitter.emit(EntityEvent.OnEntityDeath, { deadEntity: this });
    }
  }

  public initiativeRoll() {
    this.initiative = Math.round(Math.random() * 100);
  }

  public isCharacter(): this is Character {
    return this.type === PlayableEntityType.Character;
  }

  public isEnemy(): this is Enemy {
    return this.type === PlayableEntityType.Enemy;
  }

  public getRepresentation() {
    return `This is ${this.name} (${this.type})`;
  }

  public toString() {
    return this.name[0]?.toUpperCase() ?? '';
  }
}
