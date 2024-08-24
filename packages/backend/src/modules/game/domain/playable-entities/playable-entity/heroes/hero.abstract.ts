import { HeroClassType } from "@dnd/shared";
import { z } from "zod";
import { Attack } from "../../../attack/attack.entity";
import { Coord } from "../../../coord/coord.vo";
import { Inventory } from "../../../inventory/inventory.entity";
import { Spell } from "../../../item/spell/spell.entity";
import { Weapon } from "../../../item/weapon/weapon.entity";
import { Tile } from "../../../tile/tile.entity";
import { ActionHistory } from "../actions-history.interface";
import { Initiative } from "../initiative/initiative.vo";
import { Playable } from "../playable-entity.abstract";
import { PlayerStatus } from "../player-status/player-status.vo";

type Data = {
  readonly id: string;
  readonly name: string;
  readonly faction: "hero";
  readonly class: HeroClassType;
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

export abstract class Hero extends Playable<Data> {
  private static schema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    faction: z.literal("hero").default("hero"),
    class: z.enum(["WARRIOR", "CLERIC", "SORCERER", "THIEF"]),
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
        name: z.enum(["attack", "move", "open_door"]),
      }),
    ),
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
    let hasWalkedOnATrap = false;

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

      const trap = tile.entities.find(
        (tileEntity) => tileEntity.isInteractive() && tileEntity.isTrap(),
      );
      if (trap) {
        hasWalkedOnATrap = true;
        break;
      }
    }

    return { validatedPath, movementPointsUsed, hasWalkedOnATrap };
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

  public toPlain() {
    return {
      id: this._data.id,
      name: this._data.name,
      faction: this._data.faction,
      class: this._data.class,
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
    };
  }
}