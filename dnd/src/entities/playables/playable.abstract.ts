import type { AttackResult } from '../../interfaces/attack-result.type';
import { Inventory } from '../../inventory/inventory';
import type { Item } from '../../items/item.abstract';
import type { Spell } from '../../items/spells/spell.abstract';
import type { Weapon } from '../../items/weapons/weapon.abstract';
import type { Coord } from '../../map/coord';
import type { TilePath } from '../../map/pathfinder/breadth-first-search';
import { Tile } from '../../map/tile';
import { unfoldTilePath } from '../../utils/unfold-tile-path';
import { Entity } from '../entity.abstract';
import {
  EntityEvent,
  entityEventEmitter,
} from '../events/event-emitter.entity';
import { assertCanAttackTarget } from './assertions/can-attack.assert';
import { assertCharacterCanCastSpell } from './assertions/can-cast-spell.assert';
import { assertCanMoveThroughTiles } from './assertions/can-move.assert';
import type { Character } from './characters/character.abstract';
import type { Enemy } from './enemies/enemy.abstract';

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

  public move(tilePath: TilePath) {
    const unfoldedTilePath = unfoldTilePath(tilePath);
    assertCanMoveThroughTiles(this, unfoldedTilePath);

    for (const tile of unfoldedTilePath) {
      if (tile.coord.equals(this.coord)) {
        continue;
      }

      this.coord = tile.coord;
      entityEventEmitter.emit(EntityEvent.OnEntityMove, { entity: this, tile });

      const activeTrapOnTile = tile.getActiveTrap();
      if (activeTrapOnTile) {
        entityEventEmitter.emit(EntityEvent.OnTrapTriggered, {
          entity: this,
          tile,
          trap: activeTrapOnTile,
        });
        return;
      }
    }
  }

  public attack(
    item: Weapon | Spell,
    target: PlayableEntity,
    tilesInSight: Tile[],
  ): AttackResult {
    assertCanAttackTarget(this, target, item, tilesInSight);

    if (item.isSpell()) {
      assertCharacterCanCastSpell(this, item);
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
