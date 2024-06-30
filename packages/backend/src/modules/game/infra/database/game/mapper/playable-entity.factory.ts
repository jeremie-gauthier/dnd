import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { Initiative } from "src/modules/game/domain/initiative/initiative.vo";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { Hero } from "src/modules/game/domain/playable-entities/playable-entity/hero.entity";
import { Monster } from "src/modules/game/domain/playable-entities/playable-entity/monster.entity";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { PlayableEntity } from "../model/playable-entity/playable.type";
import { ItemFactory } from "./item.factory";

export class PlayableEntityFactory {
  private constructor() {}

  public static create(data: PlayableEntity): Playable {
    switch (data.type) {
      case "hero":
        return new Hero({
          ...data,
          coord: new Coord(data.coord),
          initiative: new Initiative(data.initiative),
          status: data.currentPhase,
          inventory: new Inventory({
            ...data.inventory,
            playableId: data.id,
            backpack: data.inventory.backpack.map((item) =>
              ItemFactory.create(item),
            ),
            gear: data.inventory.gear.map((item) => ItemFactory.create(item)),
          }),
        });
      case "monster":
        return new Monster({
          ...data,
          coord: new Coord(data.coord),
          initiative: new Initiative(data.initiative),
          status: data.currentPhase,
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
