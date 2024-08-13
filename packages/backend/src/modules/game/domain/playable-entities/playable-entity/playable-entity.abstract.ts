import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { Attack } from "../../attack/attack.entity";
import { Coord } from "../../coord/coord.vo";
import { Inventory } from "../../inventory/inventory.entity";
import { Spell } from "../../item/spell/spell.entity";
import { Weapon } from "../../item/weapon/weapon.entity";
import { Tile } from "../../tile/tile.entity";
import { ActionHistory } from "./actions-history.interface";
import { BehaviourAttack } from "./behaviour-attack/behaviour-attack.interface";
import { BehaviourDefender } from "./behaviour-defender/behaviour-defender.interface";
import { BehaviourMove } from "./behaviour-move/behaviour-move.interface";
import { Hero } from "./hero.entity";
import { Initiative } from "./initiative/initiative.vo";
import { Monster } from "./monster.entity";
import { PlayableEntityError } from "./playable-entity.error";
import { PlayerStatus } from "./player-status/player-status.vo";

type Data = {
  readonly id: string;
  readonly name: string;
  readonly faction: "hero" | "monster";
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
};

export abstract class Playable<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  public abstract behaviourMove: BehaviourMove;
  public abstract buildBehaviourMove(behaviourMove: BehaviourMove): void;

  public abstract behaviourAttack: BehaviourAttack;
  public abstract buildBehaviourAttack(behaviourAttack: BehaviourAttack): void;

  public abstract behaviourDefender: BehaviourDefender;
  public abstract buildBehaviourDefender(
    behaviourDefender: BehaviourDefender,
  ): void;

  public abstract act(_: { action: ActionHistory["name"] }): void;
  public abstract toPlain(): PlainData<ChildData>;

  constructor(rawData: ChildData) {
    super(rawData, rawData.id);
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

  public isHero(): this is Hero {
    return this._data.faction === "hero";
  }

  public isMonster(): this is Monster {
    return this._data.faction === "monster";
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

    const { damageTaken } = this.behaviourDefender.getDamagesInflictedResult({
      rawDamages: amount,
      characteristic: this._data.characteristic,
    });

    this._data.characteristic.healthPoints -= damageTaken;
    if (this.healthPoints <= 0) {
      this.death();
    }
    return damageTaken;
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

  public endTurn() {
    this._data.status = this._data.status.advanceTo("IDLE");
  }

  public startTurn() {
    this._data.status = this._data.status.advanceTo("ACTION");
    this._data.characteristic.actionPoints =
      this._data.characteristic.baseActionPoints;
    this._data.actionsDoneThisTurn = [];
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

  public getMovePath({ path }: { path: Array<Tile> }) {
    return this.behaviourMove.getMovePath({
      availableMovementPoints: this._data.characteristic.movementPoints,
      path,
      startingCoord: this.coord,
    });
  }

  public getAttackResult({
    attackId,
    attackItem,
  }: {
    attackId: Attack["id"];
    attackItem: Weapon | Spell;
  }) {
    if (attackItem.isSpell()) {
      return this.getSpellAttackResult({ attackId, spell: attackItem });
    } else if (attackItem.isWeapon()) {
      return this.getWeaponAttackResult({ attackId, weapon: attackItem });
    } else {
      throw new PlayableEntityError({
        name: "CANNOT_ATTACK_WITH_A_NON_ATTACK_ITEM",
        message: `Cannot attack with such item (${attackItem})`,
      });
    }
  }

  private getSpellAttackResult({
    attackId,
    spell,
  }: { attackId: Attack["id"]; spell: Spell }) {
    const manaCost = spell.getManaCost({ playableEntity: this });
    this.mustHaveEnoughManaPoints({ required: manaCost });
    const attackResult = this.behaviourAttack.getSpellAttackResult({
      spell,
      attackId,
    });
    return { type: spell.type, attackResult, manaCost };
  }

  private getWeaponAttackResult({
    attackId,
    weapon,
  }: { attackId: Attack["id"]; weapon: Weapon }) {
    const attackResult = this.behaviourAttack.getWeaponAttackResult({
      weapon,
      attackId,
    });
    return { type: weapon.type, attackResult };
  }
}
