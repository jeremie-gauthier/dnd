import {
  PlayableEntityRace,
  PlayableEntityRaceType,
  PlayableEntityType,
  PlayableEntityTypeType,
} from "@dnd/shared";
import { z } from "zod";
import { Attack } from "../../attack/attack.entity";
import { Coord } from "../../coord/coord.vo";
import { Inventory } from "../../inventory/inventory.entity";
import { Spell } from "../../item/spell/spell.entity";
import { Weapon } from "../../item/weapon/weapon.entity";
import { Tile } from "../../tile/tile.entity";
import { ActionHistory } from "./actions-history.interface";
import { Condition } from "./conditions/condition.entity";
import { Initiative } from "./initiative/initiative.vo";
import { Playable } from "./playable-entity.abstract";
import { PlayableEntityError } from "./playable-entity.error";
import { PlayerStatus } from "./player-status/player-status.vo";

type Data = {
  readonly id: string;
  readonly type: PlayableEntityTypeType;
  readonly race: PlayableEntityRaceType;
  readonly faction: "monster";
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

export class Monster extends Playable<Data> {
  private static schema = z.object({
    id: z.string(),
    faction: z.literal("monster").default("monster"),
    type: z.enum([PlayableEntityType.GOBELINOID, PlayableEntityType.UNDEAD]),
    race: z.enum([PlayableEntityRace.GOBLIN, PlayableEntityRace.BUGBEAR]),
    name: z.string(),
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
        name: z.enum(["attack", "move"]),
      }),
    ),
    conditions: z.array(z.instanceof(Condition)),
  });

  constructor(rawData: Omit<Data, "faction">) {
    const data = Monster.schema.parse(rawData);
    super(data);
  }

  public override getSpellManaCost(_: { spell: Spell }): number {
    return 0;
  }

  public override getMovePath({ path }: { path: Array<Tile> }) {
    const validatedPath: Tile[] = [];

    let previousCoord = this._data.coord;
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
            (tileEntity) =>
              !(tileEntity.isPlayable() && tileEntity.isMonster()),
          )
          .some((tileEntity) => tileEntity.isBlocking)
      ) {
        break;
      }

      previousCoord = tile.coord;
      movementPointsUsed += 1;
      validatedPath.push(tile);
    }

    return { validatedPath, movementPointsUsed, trapTriggered: undefined };
  }

  public override getSpellAttackResult({
    attackId,
    spell,
  }: { spell: Spell; attackId: Attack["id"] }) {
    const result = spell.use({ attackId });
    return result;
  }

  public override getWeaponAttackResult({
    attackId,
    weapon,
  }: { weapon: Weapon; attackId: Attack["id"] }) {
    const result = weapon.use({ attackId });
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

  private mustNotHaveAttackedThisTurn() {
    if (
      this._data.actionsDoneThisTurn.some((action) => action.name === "attack")
    ) {
      throw new PlayableEntityError({
        name: "MONSTER_CANNOT_ATTACK_MORE_THAN_ONCE_PER_TURN",
        message: `${this._data.id} has already attacked this turn`,
      });
    }
  }

  private mustBeAValidAction({ action }: { action: ActionHistory["name"] }) {
    if (!["attack", "move"].includes(action)) {
      throw new PlayableEntityError({
        name: "FORBIDDEN_ACTION",
        message: `Monster is not allowed to perform '${action}' action`,
      });
    }
  }

  public override act({ action }: { action: ActionHistory["name"] }): void {
    this.mustBeAlive();
    this.mustHaveActionPoints();
    this.mustBeAValidAction({ action });

    if (action === "attack") {
      this.mustNotHaveAttackedThisTurn();
    }

    this._data.actionsDoneThisTurn.push({ name: action });
    this._data.characteristic.actionPoints -= 1;
  }

  public override toPlain() {
    return {
      id: this._data.id,
      faction: this._data.faction,
      type: this._data.type,
      race: this._data.race,
      name: this._data.name,
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
