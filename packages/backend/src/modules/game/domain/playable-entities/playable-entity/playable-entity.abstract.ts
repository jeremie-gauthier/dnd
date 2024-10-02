import {
  PlayableEntityRaceType,
  PlayableEntityType,
  PlayableEntityTypeType,
} from "@dnd/shared";
import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { Attack } from "../../attack/attack.entity";
import { Coord } from "../../coord/coord.vo";
import { Inventory } from "../../inventory/inventory.entity";
import { Spell } from "../../item/spell/spell.entity";
import { Weapon } from "../../item/weapon/weapon.entity";
import { Trap } from "../../tile/tile-entity/interactive/trap.entity";
import { Tile } from "../../tile/tile.entity";
import { ActionHistory } from "./actions-history.interface";
import { Conditions } from "./conditions/conditions.aggregate";
import { Hero } from "./heroes/hero.abstract";
import { Initiative } from "./initiative/initiative.vo";
import { Monster } from "./monster.entity";
import { PlayableEntityError } from "./playable-entity.error";
import { PlayerStatus } from "./player-status/player-status.vo";

type Data = {
  readonly id: string;
  readonly faction: "hero" | "monster";
  readonly type: PlayableEntityTypeType;
  readonly race: PlayableEntityRaceType;
  readonly name: string;

  coord: Coord;
  isBlocking: boolean;

  status: PlayerStatus;
  playedByUserId: string;

  initiative: Initiative;
  characteristic: {
    baseHealthPoints: number;
    healthPoints: number;

    baseManaPoints: number;
    manaPoints: number;

    baseArmorClass: number;
    armorClass: number;

    baseMovementPoints: number;
    movementPoints: number;

    baseActionPoints: number;
    actionPoints: number;
  };

  inventory: Inventory;
  actionsDoneThisTurn: Array<ActionHistory>;
  conditions: Conditions;
};

export abstract class Playable<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  public abstract getMovePath(_: { path: Array<Tile> }): {
    validatedPath: Tile[];
    movementPointsUsed: number;
    trapTriggered: Trap | undefined;
  };
  public abstract getWeaponAttackResult(_: {
    weapon: Weapon;
    attackId: Attack["id"];
  }): ReturnType<Attack["roll"]>;
  public abstract getSpellAttackResult(_: {
    spell: Spell;
    attackId: Attack["id"];
  }): ReturnType<Attack["roll"]>;
  public abstract getDamagesTakenResult(_: { rawDamages: number }): {
    damageTaken: number;
  };
  public abstract act(_: { action: ActionHistory["name"] }): void;
  public abstract toPlain(): PlainData<ChildData>;

  constructor(rawData: ChildData) {
    super(rawData, rawData.id);
  }

  get race() {
    return this._data.race;
  }

  get healthPoints() {
    return this._data.characteristic.healthPoints;
  }

  get isAlive() {
    return this.healthPoints > 0;
  }

  get isDead() {
    return this.healthPoints <= 0 && this._data.isBlocking === false;
  }

  get initiative() {
    return this._data.initiative;
  }

  get coord() {
    return this._data.coord;
  }

  get faction() {
    return this._data.faction;
  }

  get isBlocking() {
    return this._data.isBlocking;
  }

  get inventory() {
    return this._data.inventory;
  }

  public get isPlaying() {
    return this._data.status.current === "ACTION";
  }

  public get conditions() {
    return this._data.conditions;
  }

  public isHero(): this is Hero {
    return this._data.faction === "hero";
  }

  public isMonster(): this is Monster {
    return this._data.faction === "monster";
  }

  public isUndead() {
    return this._data.type === PlayableEntityType.UNDEAD;
  }

  public mustBeAlive() {
    if (this.isDead) {
      throw new PlayableEntityError({
        name: "NOT_ALIVE",
        message:
          "Playable Entity must be alive in order to perform this action",
      });
    }
  }

  public takeDamage({ amount }: { amount: number }): number {
    this.mustBeAlive();

    const { damageTaken } = this.getDamagesTakenResult({ rawDamages: amount });

    this._data.characteristic.healthPoints -= damageTaken;
    if (this.healthPoints <= 0) {
      this.death();
    }
    return damageTaken;
  }

  public takeDirectDamage({ amount }: { amount: number }): number {
    this.mustBeAlive();

    this._data.characteristic.healthPoints -= amount;
    if (this.healthPoints <= 0) {
      this.death();
    }
    return amount;
  }

  protected death(): void {
    this._data.characteristic.healthPoints = 0;
    this._data.isBlocking = false;
  }

  public mustBePlayedBy({ userId }: { userId: Data["playedByUserId"] }) {
    if (this._data.playedByUserId !== userId) {
      throw new PlayableEntityError({
        name: "BAD_OWNERSHIP",
        message: `Playable entity does not belongs to user '${userId}'`,
      });
    }
  }

  public mustBeHero() {
    if (!this.isHero()) {
      throw new PlayableEntityError({
        name: "BAD_ROLE",
        message: "Playable entity must be a Hero",
      });
    }
  }

  public endTurn() {
    this.conditions.applyAllEndTurnConditions({ playableEntityAffected: this });
    this._data.status = this._data.status.advanceTo("IDLE");
  }

  public startTurn() {
    this._data.status = this._data.status.advanceTo("ACTION");
    this._data.characteristic.actionPoints =
      this._data.characteristic.baseActionPoints;
    this._data.actionsDoneThisTurn = [];
    this.conditions.applyAllStartTurnConditions({
      playableEntityAffected: this,
    });
  }

  public setCoord(coord: Coord) {
    this._data.coord = coord;
  }

  public setInitiative(value: number) {
    this._data.initiative = new Initiative(value);
  }

  public consumeMana({ amount }: { amount: number }) {
    if (amount > this._data.characteristic.manaPoints) {
      this._data.characteristic.manaPoints = 0;
    } else {
      this._data.characteristic.manaPoints -= amount;
    }
  }

  public regenHealthPoints({ amount }: { amount: number }) {
    this._data.characteristic.healthPoints = Math.min(
      this._data.characteristic.healthPoints + amount,
      this._data.characteristic.baseHealthPoints,
    );
  }

  public regenMana({ amount }: { amount: number }) {
    this._data.characteristic.manaPoints = Math.min(
      this._data.characteristic.manaPoints + amount,
      this._data.characteristic.baseManaPoints,
    );
  }

  public removeArmorClass() {
    this._data.characteristic.armorClass = 0;
  }

  public resetArmorClass() {
    this._data.characteristic.armorClass =
      this._data.characteristic.baseArmorClass;
  }

  protected mustHaveActionPoints() {
    if (this._data.characteristic.actionPoints < 1) {
      throw new PlayableEntityError({
        name: "NOT_ENOUGH_ACTION_POINTS",
        message: `Playable Entity ${this.id} cannot act`,
      });
    }
  }

  protected mustHaveEnoughManaPoints({ required }: { required: number }) {
    if (required > this._data.characteristic.manaPoints) {
      throw new PlayableEntityError({
        name: "NOT_ENOUGH_MANA_POINTS",
        message: `Playable Entity ${this.id} cannot cast a spell (not enough mana)`,
      });
    }
  }

  public mustBeLooting() {
    if (this._data.actionsDoneThisTurn.at(-1)?.name !== "open_chest") {
      throw new PlayableEntityError({
        name: "FORBIDDEN_ACTION",
        message: `Playable entity ${this.id} is not looting anything`,
      });
    }
  }

  public getAttackResult({
    attackId,
    attackItem,
  }: {
    attackId: Attack["id"];
    attackItem: Weapon | Spell;
  }) {
    if (attackItem.isSpell()) {
      const manaCost = attackItem.getManaCost({ playableEntity: this });
      this.mustHaveEnoughManaPoints({ required: manaCost });
      return {
        type: attackItem.type,
        attackResult: this.getSpellAttackResult({
          attackId,
          spell: attackItem,
        }),
        manaCost,
      };
    } else if (attackItem.isWeapon()) {
      return {
        type: attackItem.type,
        attackResult: this.getWeaponAttackResult({
          attackId,
          weapon: attackItem,
        }),
      };
    } else {
      throw new PlayableEntityError({
        name: "CANNOT_ATTACK_WITH_A_NON_ATTACK_ITEM",
        message: `Cannot attack with such item (${attackItem})`,
      });
    }
  }
}
