import { StorageSpace } from "src/database/enums/storage-space.enum";
import { ConditionFactory } from "src/modules/game/application/factories/condition.factory";
import { HeroFactory } from "src/modules/game/application/factories/hero.factory";
import { ItemFactory } from "src/modules/game/application/factories/item.factory";
import { GameItem } from "src/modules/game/application/factories/item.interface";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { Initiative } from "src/modules/game/domain/playable-entities/playable-entity/initiative/initiative.vo";
import { Monster } from "src/modules/game/domain/playable-entities/playable-entity/monster.entity";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { PlayerStatus } from "src/modules/game/domain/playable-entities/playable-entity/player-status/player-status.vo";
import { HeroEntity } from "../../entities/playable-entity/hero.entity";
import { PlayableEntity } from "../../entities/playable-entity/playable-entity.entity";

export class PlayableEntityFactory {
  private constructor() {}

  public static create(data: PlayableEntity): Playable {
    switch (data.faction) {
      case "hero": {
        const HeroClass = HeroFactory.getHeroClass(data.name);
        const hero = new HeroClass({
          ...(data as HeroEntity),
          coord: new Coord(data.coord),
          initiative: new Initiative(data.initiative),
          status: new PlayerStatus(
            data.currentPhase.toUpperCase() as Uppercase<
              PlayableEntity["currentPhase"]
            >,
          ),
          inventory: new Inventory({
            ...data.inventory,
            playableId: data.id,
            [StorageSpace.BACKPACK]: data.inventory.backpack.map((item) =>
              ItemFactory.create(item as unknown as GameItem),
            ),
            [StorageSpace.GEAR]: data.inventory.gear.map((item) =>
              ItemFactory.create(item as unknown as GameItem),
            ),
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
      case "monster": {
        const monster = new Monster({
          ...data,
          coord: new Coord(data.coord),
          initiative: new Initiative(data.initiative),
          status: new PlayerStatus(
            data.currentPhase.toUpperCase() as Uppercase<
              PlayableEntity["currentPhase"]
            >,
          ),
          inventory: new Inventory({
            ...data.inventory,
            playableId: data.id,
            [StorageSpace.BACKPACK]: data.inventory.backpack.map((item) =>
              ItemFactory.create(item as any),
            ),
            [StorageSpace.GEAR]: data.inventory.gear.map((item) =>
              ItemFactory.create(item as any),
            ),
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
  }
}
