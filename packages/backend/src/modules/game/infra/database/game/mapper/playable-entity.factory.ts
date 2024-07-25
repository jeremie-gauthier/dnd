import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { BehaviourAttackHero } from "src/modules/game/domain/playable-entities/playable-entity/behaviour-attack/behaviour-attack-hero";
import { BehaviourAttackMonster } from "src/modules/game/domain/playable-entities/playable-entity/behaviour-attack/behaviour-attack-monster";
import { BehaviourDefenderHero } from "src/modules/game/domain/playable-entities/playable-entity/behaviour-defender/behaviour-defender-hero";
import { BehaviourDefenderMonster } from "src/modules/game/domain/playable-entities/playable-entity/behaviour-defender/behaviour-defender-monster";
import { BehaviourMoveHero } from "src/modules/game/domain/playable-entities/playable-entity/behaviour-move/behaviour-move-hero";
import { BehaviourMoveMonster } from "src/modules/game/domain/playable-entities/playable-entity/behaviour-move/behaviour-move-monster";
import { Hero } from "src/modules/game/domain/playable-entities/playable-entity/hero.entity";
import { Initiative } from "src/modules/game/domain/playable-entities/playable-entity/initiative/initiative.vo";
import { Monster } from "src/modules/game/domain/playable-entities/playable-entity/monster.entity";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { PlayerStatus } from "src/modules/game/domain/playable-entities/playable-entity/player-status/player-status.vo";
import { PlayableEntity } from "../model/playable-entity/playable.type";
import { ItemFactory } from "./item.factory";

export class PlayableEntityFactory {
  private constructor() {}

  public static create(data: PlayableEntity): Playable {
    switch (data.faction) {
      case "hero":
        return new Hero({
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
        })
          .buildBehaviourMove(new BehaviourMoveHero())
          .buildBehaviourDefender(new BehaviourDefenderHero())
          .buildBehaviourAttack(new BehaviourAttackHero());
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
        })
          .buildBehaviourMove(new BehaviourMoveMonster())
          .buildBehaviourDefender(new BehaviourDefenderMonster())
          .buildBehaviourAttack(new BehaviourAttackMonster());
    }
  }
}
