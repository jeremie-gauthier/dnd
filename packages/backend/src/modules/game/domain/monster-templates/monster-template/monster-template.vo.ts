import { randomUUID } from "node:crypto";
import { PlayableEntityRaceType, PlayableEntityTypeType } from "@dnd/shared";
import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../../coord/coord.vo";
import { GameMaster } from "../../game-master/game-master.entity";
import { Inventory } from "../../inventory/inventory.entity";
import { Initiative } from "../../playable-entities/playable-entity/initiative/initiative.vo";
import { Monster } from "../../playable-entities/playable-entity/monster.entity";
import { PlayerStatus } from "../../playable-entities/playable-entity/player-status/player-status.vo";

type Data = {
  readonly type: PlayableEntityTypeType;
  readonly race: PlayableEntityRaceType;
  readonly characteristic: {
    readonly baseHealthPoints: number;
    readonly baseManaPoints: number;
    readonly baseArmorClass: number;
    readonly baseMovementPoints: number;
    readonly baseActionPoints: number;
  };
  readonly inventory: Inventory;
};

export class MonsterTemplate extends Entity<Data> {
  private static schema = z.object({
    type: z.enum(["gobelinoid", "undead"]),
    race: z.enum(["goblin", "bugbear"]),
    characteristic: z.object({
      baseHealthPoints: z.number(),
      baseManaPoints: z.number(),
      baseArmorClass: z.number(),
      baseMovementPoints: z.number(),
      baseActionPoints: z.number(),
    }),
    inventory: z.instanceof(Inventory),
  });

  constructor(rawData: Data) {
    const data = MonsterTemplate.schema.parse(rawData);
    super(data, data.race);
  }

  public get race() {
    return this._data.race;
  }

  public equals(other: MonsterTemplate): boolean {
    return (
      this._data.type === other._data.type &&
      this._data.race === other._data.race &&
      this._data.inventory.equals(other._data.inventory) &&
      this._data.characteristic.baseHealthPoints ===
        other._data.characteristic.baseHealthPoints &&
      this._data.characteristic.baseManaPoints ===
        other._data.characteristic.baseManaPoints &&
      this._data.characteristic.baseArmorClass ===
        other._data.characteristic.baseArmorClass &&
      this._data.characteristic.baseMovementPoints ===
        other._data.characteristic.baseMovementPoints &&
      this._data.characteristic.baseActionPoints ===
        other._data.characteristic.baseActionPoints
    );
  }

  public override toPlain() {
    return {
      type: this._data.type,
      race: this._data.race,
      characteristic: this._data.characteristic,
      inventory: this._data.inventory.toPlain(),
    };
  }

  public create({ gameMasterUserId }: { gameMasterUserId: GameMaster["id"] }) {
    const randomId = randomUUID();

    return new Monster({
      id: `${this._data.race}:${randomId}`,
      characteristic: {
        actionPoints: this._data.characteristic.baseActionPoints,
        baseActionPoints: this._data.characteristic.baseActionPoints,
        armorClass: this._data.characteristic.baseArmorClass,
        baseArmorClass: this._data.characteristic.baseArmorClass,
        healthPoints: this._data.characteristic.baseHealthPoints,
        baseHealthPoints: this._data.characteristic.baseHealthPoints,
        manaPoints: this._data.characteristic.baseManaPoints,
        baseManaPoints: this._data.characteristic.baseManaPoints,
        movementPoints: this._data.characteristic.baseMovementPoints,
        baseMovementPoints: this._data.characteristic.baseMovementPoints,
      },
      coord: new Coord({ row: Number.NaN, column: Number.NaN }),
      initiative: new Initiative(Number.NaN),
      inventory: this._data.inventory,
      playedByUserId: gameMasterUserId,
      isBlocking: true,
      type: this._data.type,
      race: this._data.race,
      name: `${this._data.race}-${randomId.slice(0, 4)}`,
      status: new PlayerStatus("IDLE"),
      actionsDoneThisTurn: [],
      conditions: [],
    });
  }
}
