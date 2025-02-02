import {
  PlayableEntityFaction,
  PlayableEntityFactionType,
} from "src/database/enums/playable-entity-faction.enum";
import { PlayableEntityRaceType } from "src/database/enums/playable-entity-race.enum";
import {
  PlayableEntityType,
  PlayableEntityTypeType,
} from "src/database/enums/playable-entity-type.enum";
import { CurrentPhase } from "src/modules/game/infra/database/enums/current-phase.enum";
import { Entity } from "src/modules/shared/domain/entity";
import { Attack } from "../../attack/attack.entity";
import { Coord } from "../../coord/coord.vo";
import { EntityDiedDomainEvent } from "../../domain-events/dtos/entity-died.dto";
import { PlayableEntityTookDamageDomainEvent } from "../../domain-events/dtos/playable-entity-took-damage.dto";
import { PlayableEntityTurnEndedDomainEvent } from "../../domain-events/dtos/playable-entity-turn-ended.dto";
import { PlayableEntityTurnStartedDomainEvent } from "../../domain-events/dtos/playable-entity-turn-started.dto";
import { Inventory } from "../../inventory/inventory.entity";
import { Spell } from "../../item/spell/spell.entity";
import { Weapon } from "../../item/weapon/weapon.entity";
import { Trap } from "../../tile/tile-entity/interactive/trap.entity";
import { Tile } from "../../tile/tile.entity";
import { ActionHistory } from "./actions-history.interface";
import { Condition } from "./conditions/condition.entity";
import { Hero } from "./heroes/hero.abstract";
import { Initiative } from "./initiative/initiative.vo";
import { Monster } from "./monster.entity";
import { PlayableEntityError } from "./playable-entity.error";
import { PlayerStatus } from "./player-status/player-status.vo";

type Data = {
  readonly id: string;
  readonly faction: PlayableEntityFactionType;
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
  conditions: Array<Condition>;
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

  public abstract getSpellManaCost(_: { spell: Spell }): number;

  constructor(rawData: ChildData) {
    super(rawData, rawData.id);
  }

  get race() {
    return this._data.race;
  }

  get healthPoints() {
    return this._data.characteristic.healthPoints;
  }

  get baseMovementPoints() {
    return this._data.characteristic.baseMovementPoints;
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
    return this._data.status.current === CurrentPhase.ACTION;
  }

  public get conditions() {
    return this._data.conditions;
  }

  public addCondition(condition: Condition) {
    this._data.conditions.push(condition);
  }

  public removeCondition(conditionToRemove: Condition) {
    this._data.conditions = this._data.conditions.filter(
      (condition) => !condition.equals(conditionToRemove),
    );
  }

  public isHero(): this is Hero {
    return this._data.faction === PlayableEntityFaction.HERO;
  }

  public isMonster(): this is Monster {
    return this._data.faction === PlayableEntityFaction.MONSTER;
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
    this.addDomainEvent(
      new PlayableEntityTookDamageDomainEvent({
        target: this.toPlain(),
        amount: damageTaken,
      }),
    );

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
    this.addDomainEvent(new EntityDiedDomainEvent({ target: this.toPlain() }));
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
    for (const condition of this.conditions) {
      condition.onEndOfTurn();
    }
    this._data.status = this._data.status.advanceTo(CurrentPhase.IDLE);
    this.addDomainEvent(
      new PlayableEntityTurnEndedDomainEvent({
        playableEntity: this.toPlain(),
      }),
    );
  }

  public startTurn() {
    this._data.status = this._data.status.advanceTo(CurrentPhase.ACTION);
    this._data.characteristic.actionPoints =
      this._data.characteristic.baseActionPoints;
    this._data.actionsDoneThisTurn = [];
    for (const condition of this.conditions) {
      condition.onStartOfTurn();
    }

    this.addDomainEvent(
      new PlayableEntityTurnStartedDomainEvent({
        playableEntity: this.toPlain(),
      }),
    );
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

  public addMovementPoints({ amount }: { amount: number }) {
    this._data.characteristic.movementPoints =
      this._data.characteristic.movementPoints + amount;
  }

  public resetMovementPoints() {
    this._data.characteristic.movementPoints =
      this._data.characteristic.baseMovementPoints;
  }

  protected mustHaveActionPoints() {
    if (this._data.characteristic.actionPoints < 1) {
      throw new PlayableEntityError({
        name: "NOT_ENOUGH_ACTION_POINTS",
        message: `Playable Entity ${this.id} cannot act`,
      });
    }
  }

  public mustHaveEnoughManaPoints({ required }: { required: number }) {
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
}
