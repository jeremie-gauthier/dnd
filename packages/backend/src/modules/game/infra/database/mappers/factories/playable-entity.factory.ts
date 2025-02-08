import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { Hero as HeroDomain } from "src/modules/game/domain/playable-entities/playable-entity/heroes/hero.abstract";
import { Initiative } from "src/modules/game/domain/playable-entities/playable-entity/initiative/initiative.vo";
import { Monster as MonsterDomain } from "src/modules/game/domain/playable-entities/playable-entity/monster.entity";
import { Playable as PlayableDomain } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { PlayerStatus } from "src/modules/game/domain/playable-entities/playable-entity/player-status/player-status.vo";
import { HeroEntity } from "../../entities/game-entity/playable-entity/hero.entity";
import { MonsterEntity } from "../../entities/game-entity/playable-entity/monster.entity";
import { PlayableEntityFaction } from "../../enums/playable-entity-faction.enum";
import { StorageSpace } from "../../enums/storage-space.enum";
import { EntityType } from "../../enums/tile-entity-type.enum";
import { PlayableEntityPersistence } from "../../interfaces/playable-entity-persistence.interface";
import { ConditionFactory } from "./condition.factory";
import { HeroFactory } from "./hero.factory";
import { ItemFactory } from "./item.factory";

export class PlayableEntityFactory {
  private constructor() {}

  public static create(data: PlayableEntityPersistence): PlayableDomain {
    switch (data.faction) {
      case PlayableEntityFaction.HERO:
        return PlayableEntityFactory.createHero(data);
      case PlayableEntityFaction.MONSTER:
        return PlayableEntityFactory.createMonster(data);
    }
  }

  private static createHero(data: HeroEntity): HeroDomain {
    const HeroClass = HeroFactory.getHeroClass(data.name);
    const hero = new HeroClass({
      ...(data as HeroEntity),
      type: EntityType.PLAYABLE_ENTITY,
      coord: new Coord(data.coord),
      initiative: new Initiative(data.initiative),
      status: new PlayerStatus(data.currentPhase),
      inventory: new Inventory({
        ...data.inventory,
        playableId: data.id,
        [StorageSpace.BACKPACK]: data.inventory.inventoryItems
          .filter((item) => item.storageSpace === StorageSpace.BACKPACK)
          // TODO: THIS IS FAKE FOR NOW
          .map(({ item }) => ItemFactory.create(item)),
        [StorageSpace.GEAR]: data.inventory.inventoryItems
          .filter((item) => item.storageSpace === StorageSpace.GEAR)
          // TODO: THIS IS FAKE FOR NOW
          .map(({ item }) => ItemFactory.create(item)),
      }),
      conditions: [],
    });

    for (const condition of data.conditions) {
      hero.addCondition(
        ConditionFactory.create({
          ...condition,
          playableEntityAffected: hero,
        }),
      );
    }

    return hero;
  }

  private static createMonster(data: MonsterEntity): MonsterDomain {
    const monster = new MonsterDomain({
      ...data,
      type: EntityType.PLAYABLE_ENTITY,
      coord: new Coord(data.coord),
      initiative: new Initiative(data.initiative),
      status: new PlayerStatus(data.currentPhase),
      inventory: new Inventory({
        ...data.inventory,
        playableId: data.id,
        [StorageSpace.BACKPACK]: data.inventory.inventoryItems
          .filter((item) => item.storageSpace === StorageSpace.BACKPACK)
          // TODO: THIS IS FAKE FOR NOW
          .map(({ item }) => ItemFactory.create(item)),
        [StorageSpace.GEAR]: data.inventory.inventoryItems
          .filter((item) => item.storageSpace === StorageSpace.BACKPACK)
          // TODO: THIS IS FAKE FOR NOW
          .map(({ item }) => ItemFactory.create(item)),
      }),
      conditions: [],
    });

    for (const condition of data.conditions) {
      monster.addCondition(
        ConditionFactory.create({
          ...condition,
          playableEntityAffected: monster,
        }),
      );
    }

    return monster;
  }
}
