import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { Hero as HeroDomain } from "src/modules/game/domain/playable-entities/playable-entity/heroes/hero.abstract";
import { Initiative } from "src/modules/game/domain/playable-entities/playable-entity/initiative/initiative.vo";
import { PlayerStatus } from "src/modules/game/domain/playable-entities/playable-entity/player-status/player-status.vo";
import { Mapper } from "src/modules/shared/infra/mapper";
import { HeroTemplate as HeroTemplatePersistence } from "../entities/playable-entity-template/hero-template.entity";
import { CurrentPhase } from "../enums/current-phase.enum";
import { StorageSpace } from "../enums/storage-space.enum";
import { ItemPersistence } from "../interfaces/item-persistence.interface";
import { HeroFactory } from "./factories/hero.factory";
import { ItemFactory } from "./factories/item.factory";

@Injectable()
export class HeroTemplateMapper extends Mapper<
  HeroTemplatePersistence,
  HeroDomain
> {
  public toDomain(persistence: HeroTemplatePersistence): HeroDomain {
    const HeroCls = HeroFactory.getHeroClass(persistence.name);
    const heroId = randomUUID();
    return new HeroCls({
      actionsDoneThisTurn: [],
      baseCharacteristic: persistence.baseCharacteristic,
      characteristic: persistence.characteristic,
      class: persistence.class,
      conditions: [],
      coord: new Coord({ row: Number.NaN, column: Number.NaN }),
      id: heroId,
      initiative: new Initiative(Number.NaN),
      inventory: new Inventory({
        playableId: heroId,
        storageCapacity: persistence.inventory.storageCapacity,
        backpack: persistence.inventory.stuff
          .filter((stuff) => stuff.storageSpace === StorageSpace.BACKPACK)
          // TODO: THIS IS FAKE FOR NOW
          .map((stuff) => ItemFactory.create(stuff.item as ItemPersistence)),
        gear: persistence.inventory.stuff
          .filter((stuff) => stuff.storageSpace === StorageSpace.GEAR)
          // TODO: THIS IS FAKE FOR NOW
          .map((stuff) => ItemFactory.create(stuff.item as ItemPersistence)),
      }),
      isBlocking: persistence.isBlocking,
      level: persistence.level,
      name: persistence.name,
      playedByUserId: "",
      race: persistence.race,
      status: new PlayerStatus(CurrentPhase.IDLE),
      type: persistence.type,
    });
  }

  public toPersistence(domain: HeroDomain): HeroTemplatePersistence {
    throw new Error("Method not implemented.");
  }
}
