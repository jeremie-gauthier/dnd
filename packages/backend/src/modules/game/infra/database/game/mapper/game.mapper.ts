import { Board } from "src/modules/game/domain/board/board.entity";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { GameMaster } from "src/modules/game/domain/game-master/game-master.entity";
import { GameStatus } from "src/modules/game/domain/game-status/game-status.vo";
import { Game as GameDomain } from "src/modules/game/domain/game/game.aggregate";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { MonsterTemplate } from "src/modules/game/domain/monster-template/monster-template.vo";
import { PlayableEntities } from "src/modules/game/domain/playable-entities/playable-entities.aggregate";
import { Hero } from "src/modules/game/domain/playable-entities/playable-entity/hero.entity";
import { Monster } from "src/modules/game/domain/playable-entities/playable-entity/monster.entity";
import { Tile } from "src/modules/game/domain/tile/tile.entity";
import { Mapper } from "src/modules/shared/infra/mapper";
import { GameEvent } from "../model/game-event.type";
import { GamePersistence } from "../model/game.model";
import { GameEventFactory } from "./game-event.factory";
import { ItemFactory } from "./item.factory";
import { PlayableEntityFactory } from "./playable-entity.factory";
import { TileEntityFactory } from "./tile-entity.factory";

export class GameMapper extends Mapper<GamePersistence, GameDomain> {
  public toDomain(persistence: GamePersistence): GameDomain {
    return new GameDomain({
      id: persistence.id,
      status: new GameStatus(persistence.status),
      board: new Board({
        height: persistence.board.height,
        width: persistence.board.width,
        tiles: persistence.board.tiles.map(
          (tile) =>
            new Tile({
              ...tile,
              coord: new Coord(tile.coord),
              entities: tile.entities.map((tileEntity) =>
                TileEntityFactory.create(tileEntity),
              ),
            }),
        ),
      }),
      events: persistence.events.map((event) => GameEventFactory.create(event)),
      gameMaster: new GameMaster({ userId: persistence.gameMaster.userId }),
      monsterTemplates: persistence.enemyTemplates.map(
        (enemyTemplate) =>
          new MonsterTemplate({
            ...enemyTemplate,
            inventory: new Inventory({
              ...enemyTemplate.inventory,
              playableId: enemyTemplate.kind,
              backpack: enemyTemplate.inventory.backpack.map((item) =>
                ItemFactory.create(item),
              ),
              gear: enemyTemplate.inventory.gear.map((item) =>
                ItemFactory.create(item),
              ),
            }),
          }),
      ),
      playableEntities: new PlayableEntities({
        values: Object.values(persistence.playableEntities).map(
          (playableEntity) => PlayableEntityFactory.create(playableEntity),
        ),
      }),
    });
  }

  public toPersistence(domain: GameDomain): GamePersistence {
    const plain = domain.toPlain();

    return {
      id: plain.id,
      status: plain.status,
      playableEntities: Object.fromEntries(
        plain.playableEntities.values.map((playableEntity) => {
          return [
            playableEntity.id,
            playableEntity.type === "hero"
              ? this.getHero({
                  hero: playableEntity as ReturnType<Hero["toPlain"]>,
                })
              : this.getMonster({
                  monster: playableEntity as ReturnType<Monster["toPlain"]>,
                }),
          ];
        }),
      ),
      board: plain.board as GamePersistence["board"],
      gameMaster: plain.gameMaster,
      enemyTemplates: plain.monsterTemplates,
      events: plain.events as GameEvent[],
    };
  }

  private getHero({ hero }: { hero: ReturnType<Hero["toPlain"]> }) {
    return {
      ...hero,
      currentPhase: hero.status,
      actionsDoneThisTurn: [],
    };
  }

  private getMonster({ monster }: { monster: ReturnType<Monster["toPlain"]> }) {
    return {
      ...monster,
      currentPhase: monster.status,
      actionsDoneThisTurn: [],
    };
  }
}
