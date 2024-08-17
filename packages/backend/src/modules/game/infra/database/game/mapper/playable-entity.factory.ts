import { HeroFactory } from "src/modules/game/application/factories/hero.factory";
import { ItemFactory } from "src/modules/game/application/factories/item.factory";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { Initiative } from "src/modules/game/domain/playable-entities/playable-entity/initiative/initiative.vo";
import { Monster } from "src/modules/game/domain/playable-entities/playable-entity/monster.entity";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { PlayerStatus } from "src/modules/game/domain/playable-entities/playable-entity/player-status/player-status.vo";
import { PlayableEntity } from "../model/playable-entity/playable.type";

export class PlayableEntityFactory {
  private constructor() {}

  public static create(data: PlayableEntity): Playable {
    switch (data.faction) {
      case "hero": {
        const HeroClass = HeroFactory.getHeroClass(data.name);
        return new HeroClass({
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
            backpack: data.inventory.backpack.map((item) =>
              ItemFactory.create(item),
            ),
            gear: data.inventory.gear.map((item) => ItemFactory.create(item)),
          }),
        });
      }
      case "monster":
        return new Monster({
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
            backpack: data.inventory.backpack.map((item) =>
              ItemFactory.create(item),
            ),
            gear: data.inventory.gear.map((item) => ItemFactory.create(item)),
          }),
        });
    }
  }
}
