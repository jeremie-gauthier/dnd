import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../coord/coord.vo";
import { DoorOpenedDomainEvent } from "../domain-events/dtos/door-opened.dto";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { TileInteractiveEntityError } from "./tile-entity/interactive/interactive.error";
import { Trap } from "./tile-entity/interactive/trap.entity";
import { TileEntity } from "./tile-entity/tile-entity.abstract";
import { TileError } from "./tile-entity/tile.error";

type Data = {
  coord: Coord;
  entities: Array<TileEntity>;
  isStartingTile?: true;
};

export class Tile extends Entity<Data> {
  private static schema = z.object({
    coord: z.instanceof(Coord),
    entities: z.array(z.instanceof(TileEntity)),
    isStartingTile: z.literal(true).optional(),
  });

  constructor(rawData: Data) {
    const data = Tile.schema.parse(rawData);
    super(data);
  }

  public get coord() {
    return this._data.coord;
  }

  public get entities() {
    return this._data.entities;
  }

  public override toPlain() {
    return {
      coord: this._data.coord.toPlain(),
      entities: this._data.entities.map((gameEntity) => gameEntity.toPlain()),
      isStartingTile: this._data.isStartingTile,
    };
  }

  public removeEntity({ tileEntity }: { tileEntity: TileEntity }) {
    this._data.entities = this._data.entities.filter(
      (entity) => !entity.equals(tileEntity),
    );
  }

  public addEntity({ tileEntity }: { tileEntity: TileEntity }) {
    this._data.entities.push(tileEntity);
  }

  public openDoor({ playableEntity }: { playableEntity: Playable }) {
    const doorEntity = this._data.entities.find(
      (entity) => entity.isInteractive() && entity.isDoor(),
    );
    if (!doorEntity) {
      throw new TileError({
        name: "TILE_ENTITY_NOT_FOUND",
        message: `No Door entity found at coord ${this._data.coord}`,
      });
    }

    if (!playableEntity.coord.isAdjacentTo(this._data.coord)) {
      throw new TileInteractiveEntityError({
        name: "CANNOT_INTERACT",
        message: `Playable Entity ${playableEntity.id} [${playableEntity.coord}] cannot open the door [${this._data.coord}] as it is not adjacent to it`,
      });
    }

    doorEntity.onInteraction();
    this.addDomainEvent(
      new DoorOpenedDomainEvent({
        entityThatOpenedTheDoor: playableEntity.toPlain(),
      }),
    );
  }

  public openChest({ playableEntity }: { playableEntity: Playable }) {
    const chestEntity = this._data.entities.find(
      (entity) => entity.isInteractive() && entity.isChest(),
    );
    if (!chestEntity) {
      throw new TileError({
        name: "TILE_ENTITY_NOT_FOUND",
        message: `No Chest entity found at coord ${this._data.coord}`,
      });
    }

    if (!playableEntity.coord.isAdjacentTo(this._data.coord)) {
      throw new TileInteractiveEntityError({
        name: "CANNOT_INTERACT",
        message: `Playable Entity ${playableEntity.id} [${playableEntity.coord}] cannot open the chest [${this._data.coord}] as it is not adjacent to it`,
      });
    }

    chestEntity.onInteraction();
  }

  public getActiveTrap() {
    return this.entities.find(
      (tileEntity) =>
        tileEntity.isInteractive() &&
        tileEntity.isTrap() &&
        tileEntity.canInteract,
    ) as Trap | undefined;
  }

  public isBlockedByNonInteractiveEntity() {
    return this._data.entities.some((entity) => entity.isNonInteractive());
  }
}
