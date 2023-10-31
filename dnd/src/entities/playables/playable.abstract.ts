import type { AttackResult } from '../../interfaces/attack-result.type';
import { AttackType } from '../../interfaces/attack-type.enum';
import { SpellCasterCharacter } from '../../interfaces/character-class.type';
import { Inventory } from '../../inventory/inventory';
import type { Item } from '../../items/item.abstract';
import type { Spell } from '../../items/spells/spell.abstract';
import type { Weapon } from '../../items/weapons/weapon.abstract';
import type { Coord } from '../../map/coord';
import { Tile } from '../../map/tile';
import { Entity } from '../entity.abstract';
import {
  EntityEvent,
  entityEventEmitter,
} from '../events/event-emitter.entity';
import type { Character } from './characters/character.abstract';
import type { Enemy } from './enemies/enemy.abstract';
import { CannotCastSpellError } from './errors/cannot-cast-spell-error';
import { CannotMeleeAttackError } from './errors/cannot-melee-attack-error';
import { CannotRangeAttackError } from './errors/cannot-range-attack-error';
import { NotACharacterError } from './errors/not-a-character-error';
import { NotEnoughManaError } from './errors/not-enough-mana-error';
import { NotEquippedError } from './errors/not-equipped-error';
import { NotInSightError } from './errors/not-in-sight-error';

export enum PlayableEntityType {
  Character = 'character',
  Enemy = 'Enemy',
}

export abstract class PlayableEntity extends Entity {
  public isBlocking = true;
  public readonly isPlayable = true;

  abstract readonly type: PlayableEntityType;

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

  constructor(public coord: Coord) {
    super();
  }

  get isAlive() {
    return this.healthPoints > 0;
  }

  protected abstract afterDiceRollsHook(
    attackResult: AttackResult,
    item: Item,
    target: PlayableEntity,
  ): AttackResult;

  public attack(
    item: Weapon | Spell,
    target: PlayableEntity,
    tilesInSight: Tile[],
  ): AttackResult {
    this.assertCanAttackTarget(item, target, tilesInSight);

    if (item.isSpell() && this.isCharacter()) {
      this.assertCharacterCanCastSpell(item);
      this.manaPoints -= item.getManaCost(this.class);
    }

    const diceRolls = item.rollAttack();

    const diceRollsWithModifiers = this.afterDiceRollsHook(
      diceRolls,
      item,
      target,
    );

    const [totalDamages] = diceRollsWithModifiers;
    console.log(
      `${this.name} attacked ${target.name} with ${item.name} (${item.type}) and inflicted ${totalDamages} damages`,
    );

    // TODO: event emitter ??
    target.takeDamage(totalDamages);

    return diceRollsWithModifiers;
  }

  private assertCanAttackTarget(
    item: Weapon | Spell,
    target: PlayableEntity,
    tilesInSight: Tile[],
  ) {
    if (!this.inventory.isItemEquipped(item)) {
      throw new NotEquippedError(item);
    }

    if (!tilesInSight.some((tile) => tile.coord.equals(target.coord))) {
      throw new NotInSightError(target);
    }

    if (
      item.attackType === AttackType.Melee &&
      !this.coord.isNextTo(target.coord)
    ) {
      throw new CannotMeleeAttackError();
    }

    if (
      item.attackType === AttackType.Range &&
      this.coord.isNextTo(target.coord)
    ) {
      throw new CannotRangeAttackError();
    }
  }

  private assertCharacterCanCastSpell(
    item: Spell,
  ): asserts this is SpellCasterCharacter {
    if (!this.isCharacter()) {
      throw new NotACharacterError();
    }

    if (!this.isSpellCaster()) {
      throw new CannotCastSpellError(this.class);
    }

    const manaCost = item.manaCost[this.class];
    if (this.manaPoints < manaCost) {
      throw new NotEnoughManaError(this, item);
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
}
