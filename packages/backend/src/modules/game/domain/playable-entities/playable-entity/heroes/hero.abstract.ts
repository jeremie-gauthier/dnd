import {
  HeroClass,
  HeroClassType,
  PlayableEntityRace,
  PlayableEntityRaceType,
  PlayableEntityType,
  PlayableEntityTypeType,
} from "@dnd/shared";
import { z } from "zod";
import { Attack } from "../../../attack/attack.entity";
import { Coord } from "../../../coord/coord.vo";
import { Inventory } from "../../../inventory/inventory.entity";
import { Spell } from "../../../item/spell/spell.entity";
import { Weapon } from "../../../item/weapon/weapon.entity";
import { Trap } from "../../../tile/tile-entity/interactive/trap.entity";
import { Tile } from "../../../tile/tile.entity";
import { ActionHistory } from "../actions-history.interface";
import { Condition } from "../conditions/condition.base";
import { Initiative } from "../initiative/initiative.vo";
import { Playable } from "../playable-entity.abstract";
import { PlayerStatus } from "../player-status/player-status.vo";

type Data = {
  readonly id: string;
  readonly faction: "hero";
  readonly name: string;
  readonly type: PlayableEntityTypeType;
  readonly race: PlayableEntityRaceType;
  readonly class: HeroClassType;
  readonly level: number;

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

export abstract class Hero extends Playable<Data> {
  private static schema = z.object({
    id: z.string().uuid(),
    faction: z.literal("hero").default("hero"),
    name: z.string(),
    type: z.enum([PlayableEntityType.HUMANOID]),
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
    characteristic: z.object({
      baseHealthPoints: z.number().min(1),
      healthPoints: z.number().min(0),
      baseManaPoints: z.number().min(0),
      manaPoints: z.number().min(0),
      baseArmorClass: z.number().min(0),
      armorClass: z.number().min(0),
      baseMovementPoints: z.number().min(1),
      movementPoints: z.number().min(0),
      baseActionPoints: z.number().min(1),
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

  public getMovePath({ path }: { path: Array<Tile> }) {
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
    for (const condition of this.conditions) {
      condition.onBeforeOutgoingWeaponAttack(result);
    }
    return result;
  }

  public getDamagesTakenResult({ rawDamages }: { rawDamages: number }): {
    damageTaken: number;
  } {
    const damageTaken = Math.max(
      0,
      rawDamages - this._data.characteristic.armorClass,
    );
    return { damageTaken };
  }

  public act({ action }: { action: ActionHistory["name"] }): void {
    this.mustBeAlive();
    this.mustHaveActionPoints();

    this._data.actionsDoneThisTurn.push({ name: action });
    this._data.characteristic.actionPoints -= 1;
  }

  public revive({
    amountHealthPoints,
    amountManaPoints,
  }: { amountHealthPoints: number; amountManaPoints: number }) {
    this._data.isBlocking = true;
    this.regenHealthPoints({ amount: amountHealthPoints });
    this.regenMana({ amount: amountManaPoints });
  }

  public toPlain() {
    return {
      id: this._data.id,
      faction: this._data.faction,
      name: this._data.name,
      type: this._data.type,
      race: this._data.race,
      class: this._data.class,
      level: this._data.level,
      coord: this._data.coord.toPlain(),
      isBlocking: this._data.isBlocking,
      initiative: this._data.initiative.toPlain(),
      playedByUserId: this._data.playedByUserId,
      status: this._data.status.toPlain(),
      characteristic: {
        baseHealthPoints: this._data.characteristic.baseHealthPoints,
        healthPoints: this._data.characteristic.healthPoints,
        baseManaPoints: this._data.characteristic.baseManaPoints,
        manaPoints: this._data.characteristic.manaPoints,
        baseArmorClass: this._data.characteristic.baseArmorClass,
        armorClass: this._data.characteristic.armorClass,
        baseMovementPoints: this._data.characteristic.baseMovementPoints,
        movementPoints: this._data.characteristic.movementPoints,
        baseActionPoints: this._data.characteristic.baseActionPoints,
        actionPoints: this._data.characteristic.actionPoints,
      },
      inventory: this._data.inventory.toPlain(),
      actionsDoneThisTurn: this._data.actionsDoneThisTurn,
      conditions: this._data.conditions.map((condition) => condition.toPlain()),
    };
  }
}
