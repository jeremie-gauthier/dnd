import {
  HeroClass,
  HeroClassType,
} from "src/modules/game/infra/database/enums/hero-class.enum";
import { PlayableEntityFaction } from "src/modules/game/infra/database/enums/playable-entity-faction.enum";
import {
  PlayableEntityRace,
  PlayableEntityRaceType,
} from "src/modules/game/infra/database/enums/playable-entity-race.enum";
import {
  PlayableEntityArchetype,
  PlayableEntityArchetypeType,
} from "src/modules/game/infra/database/enums/playable-entity-type.enum";
import {
  EntityType,
  EntityTypeType,
} from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { z } from "zod";
import { Attack } from "../../../attack/attack.entity";
import { Coord } from "../../../coord/coord.vo";
import { Inventory } from "../../../inventory/inventory.entity";
import { Spell } from "../../../item/spell/spell.entity";
import { Weapon } from "../../../item/weapon/weapon.entity";
import { Trap } from "../../../tile/tile-entity/interactive/trap.entity";
import { Tile } from "../../../tile/tile.entity";
import { ActionHistory } from "../actions-history.interface";
import { Condition } from "../conditions/condition.entity";
import { Initiative } from "../initiative/initiative.vo";
import { Playable } from "../playable-entity.abstract";
import { PlayableEntityError } from "../playable-entity.error";
import { PlayerStatus } from "../player-status/player-status.vo";

type Data = {
  readonly id: string;
  readonly faction: "hero";
  readonly name: string;
  readonly archetype: PlayableEntityArchetypeType;
  readonly type: EntityTypeType;
  readonly race: PlayableEntityRaceType;
  readonly class: HeroClassType;
  readonly level: number;

  coord: Coord;
  isBlocking: boolean;

  status: PlayerStatus;
  playedByUserId: string;

  initiative: Initiative;
  readonly baseCharacteristic: {
    readonly healthPoints: number;
    readonly manaPoints: number;
    readonly armorClass: number;
    readonly movementPoints: number;
    readonly actionPoints: number;
  };
  characteristic: {
    healthPoints: number;
    manaPoints: number;
    armorClass: number;
    movementPoints: number;
    actionPoints: number;
  };

  inventory: Inventory;
  actionsDoneThisTurn: Array<ActionHistory>;
  conditions: Array<Condition>;
};

export abstract class Hero extends Playable<Data> {
  private static readonly schema = z.object({
    id: z.string().uuid(),
    faction: z
      .literal(PlayableEntityFaction.HERO)
      .default(PlayableEntityFaction.HERO),
    name: z.string(),
    archetype: z.enum([PlayableEntityArchetype.HUMANOID]),
    type: z
      .literal(EntityType.PLAYABLE_ENTITY)
      .optional()
      .default(EntityType.PLAYABLE_ENTITY),
    race: z.enum([
      PlayableEntityRace.HUMAN,
      PlayableEntityRace.ELF,
      PlayableEntityRace.HALFLING,
    ]),
    class: z.enum([
      HeroClass.WARRIOR,
      HeroClass.CLERIC,
      HeroClass.SORCERER,
      HeroClass.THIEF,
    ]),
    level: z.number().min(1).max(3),
    coord: z.instanceof(Coord),
    isBlocking: z.boolean(),
    status: z.instanceof(PlayerStatus),
    playedByUserId: z.string(),
    initiative: z.instanceof(Initiative),
    baseCharacteristic: z
      .object({
        healthPoints: z.number().min(1),
        manaPoints: z.number().min(0),
        armorClass: z.number().min(0),
        movementPoints: z.number().min(1),
        actionPoints: z.number().min(1),
      })
      .readonly(),
    characteristic: z.object({
      healthPoints: z.number().min(0),
      manaPoints: z.number().min(0),
      armorClass: z.number().min(0),
      movementPoints: z.number().min(0),
      actionPoints: z.number().min(0),
    }),
    inventory: z.instanceof(Inventory),
    actionsDoneThisTurn: z.array(
      z.object({
        name: z.enum([
          "attack",
          "move",
          "open_door",
          "delete_item",
          "swap_items",
          "open_chest",
        ]),
      }),
    ),
    conditions: z.array(z.instanceof(Condition)),
  });

  constructor(rawData: Omit<Data, "faction">) {
    const data = Hero.schema.parse(rawData);
    super(data);
  }

  public get class() {
    return this._data.class;
  }

  public override getSpellManaCost({ spell }: { spell: Spell }): number {
    const manaCost = spell.manaCosts.find(
      (manaCost) => manaCost.class === this.class,
    )?.cost;
    if (manaCost === undefined) {
      throw new PlayableEntityError({
        name: "CANNOT_CAST_SPELL",
        message: `A ${this.class} cannot cast spell ${this.id}`,
      });
    }
    return manaCost;
  }

  public override getMovePath({ path }: { path: Array<Tile> }) {
    const validatedPath: Tile[] = [];
    let trapTriggered: Trap | undefined = undefined;

    let previousCoord = this.coord;
    let movementPointsUsed = 0;

    for (const tile of path) {
      if (movementPointsUsed >= this._data.characteristic.movementPoints) {
        break;
      }
      if (!previousCoord.isAdjacentTo(tile.coord)) {
        break;
      }
      if (
        tile.entities
          .filter(
            (tileEntity) => !(tileEntity.isPlayable() && tileEntity.isHero()),
          )
          .some((tileEntity) => tileEntity.isBlocking)
      ) {
        break;
      }

      previousCoord = tile.coord;
      movementPointsUsed += 1;
      validatedPath.push(tile);

      trapTriggered = tile.getActiveTrap();
      if (trapTriggered) {
        break;
      }
    }

    return { validatedPath, movementPointsUsed, trapTriggered };
  }

  public override getSpellAttackResult({
    attackId,
    spell,
  }: { spell: Spell; attackId: Attack["id"] }) {
    const result = spell.use({ attackId });
    return result;
  }

  public override getDamagesTakenResult({
    rawDamages,
  }: { rawDamages: number }): {
    damageTaken: number;
  } {
    const damageTaken = Math.max(
      0,
      rawDamages - this._data.characteristic.armorClass,
    );
    return { damageTaken };
  }

  public override act({ action }: { action: ActionHistory["name"] }): void {
    this.mustBeAlive();
    this.mustHaveActionPoints();

    this._data.actionsDoneThisTurn.push({ name: action });
    this._data.characteristic.actionPoints -= 1;
  }

  public override getWeaponAttackResult({
    attackId,
    weapon,
  }: { weapon: Weapon; attackId: Attack["id"] }) {
    const result = weapon.use({ attackId });
    for (const condition of this.conditions) {
      condition.onBeforeOutgoingWeaponAttack(result);
    }
    return result;
  }

  public revive({
    amountHealthPoints,
    amountManaPoints,
  }: { amountHealthPoints: number; amountManaPoints: number }) {
    this._data.isBlocking = true;
    this.regenHealthPoints({ amount: amountHealthPoints });
    this.regenMana({ amount: amountManaPoints });
  }

  public override toPlain() {
    return {
      id: this._data.id,
      faction: this._data.faction,
      name: this._data.name,
      archetype: this._data.archetype,
      type: this._data.type,
      race: this._data.race,
      class: this._data.class,
      level: this._data.level,
      coord: this._data.coord.toPlain(),
      isBlocking: this._data.isBlocking,
      initiative: this._data.initiative.toPlain(),
      playedByUserId: this._data.playedByUserId,
      status: this._data.status.toPlain(),
      baseCharacteristic: {
        healthPoints: this._data.baseCharacteristic.healthPoints,
        manaPoints: this._data.baseCharacteristic.manaPoints,
        armorClass: this._data.baseCharacteristic.armorClass,
        movementPoints: this._data.baseCharacteristic.movementPoints,
        actionPoints: this._data.baseCharacteristic.actionPoints,
      },
      characteristic: {
        healthPoints: this._data.characteristic.healthPoints,
        manaPoints: this._data.characteristic.manaPoints,
        armorClass: this._data.characteristic.armorClass,
        movementPoints: this._data.characteristic.movementPoints,
        actionPoints: this._data.characteristic.actionPoints,
      },
      inventory: this._data.inventory.toPlain(),
      actionsDoneThisTurn: this._data.actionsDoneThisTurn,
      conditions: this._data.conditions.map((condition) => condition.toPlain()),
    };
  }
}
