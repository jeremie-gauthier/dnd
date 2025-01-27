import { StorageSpace } from "src/database/enums/storage-space.enum";
import { TileEntityType } from "src/database/enums/tile-entity-type.enum";
import { GameEventFactory } from "src/modules/game/application/factories/game-event.factory";
import { ItemFactory } from "src/modules/game/application/factories/item.factory";
import { GameItem } from "src/modules/game/application/factories/item.interface";
import { TileEntityFactory } from "src/modules/game/application/factories/tile-entity.factory";
import { WinConditionFactory } from "src/modules/game/application/factories/win-condition.factory";
import { Board } from "src/modules/game/domain/board/board.entity";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { GameEvents } from "src/modules/game/domain/game-events/game-events.aggregate";
import { GameMaster } from "src/modules/game/domain/game-master/game-master.entity";
import { GameStatus } from "src/modules/game/domain/game-status/game-status.vo";
import { Game as GameDomain } from "src/modules/game/domain/game/game.aggregate";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { MonsterTemplate } from "src/modules/game/domain/monster-templates/monster-template/monster-template.vo";
import { MonsterTemplates } from "src/modules/game/domain/monster-templates/monster-templates.aggregate";
import { PlayableEntities } from "src/modules/game/domain/playable-entities/playable-entities.aggregate";
import { Hero } from "src/modules/game/domain/playable-entities/playable-entity/heroes/hero.abstract";
import { Monster } from "src/modules/game/domain/playable-entities/playable-entity/monster.entity";
import { PlayerStatus } from "src/modules/game/domain/playable-entities/playable-entity/player-status/player-status.vo";
import { BoundingBox } from "src/modules/game/domain/rooms/room/bounding-box/bounding-box.entity";
import { Room } from "src/modules/game/domain/rooms/room/room.entity";
import { Rooms } from "src/modules/game/domain/rooms/rooms.aggregate";
import { Tile } from "src/modules/game/domain/tile/tile.entity";
import { WinConditions } from "src/modules/game/domain/win-conditions/win-conditions.aggregate";
import { Mapper } from "src/modules/shared/infra/mapper";
import { GameRoomsDeserialized } from "src/modules/shared/interfaces/game-rooms-deserialized.interface";
import { GameWinConditionsDeserialized } from "src/modules/shared/interfaces/game-win-conditions-deserialized.interface";
import { GameEvent } from "../../entities/game-event/game-event.entity";
import { Game as GamePersistence } from "../../entities/game.entity";
import { TilePlayableEntity } from "../../entities/tile-entity/tile-playable-entity/tile-playable-entity.entity";
import { PlayableEntityFactory } from "./playable-entity.factory";

export class GameMapper extends Mapper<GamePersistence, GameDomain> {
  public override toDomain(persistence: GamePersistence): GameDomain {
    return new GameDomain({
      id: persistence.id,
      host: persistence.gameMaster,
      status: new GameStatus(persistence.status),
      board: new Board({
        height: persistence.board.height,
        width: persistence.board.width,
        tiles: persistence.board.tiles.map(
          (tile) =>
            new Tile({
              ...tile,
              coord: new Coord(tile.coord),
              isStartingTile: false,
              entities: tile.entities.map((tileEntity) =>
                TileEntityFactory.create({
                  tileEntity,
                  playableEntityRef:
                    tileEntity.type === TileEntityType.PLAYABLE_ENTITY
                      ? PlayableEntityFactory.create(
                          persistence.playableEntities.find(
                            (playableEntity) =>
                              playableEntity.id ===
                              (tileEntity as TilePlayableEntity).id,
                          )!,
                        )
                      : undefined,
                }),
              ),
            }),
        ),
      }),
      events: new GameEvents({
        values: persistence.events.map((event) =>
          GameEventFactory.create(event),
        ),
      }),
      gameMaster: new GameMaster({ userId: persistence.gameMaster.userId }),
      monsterTemplates: new MonsterTemplates({
        values: persistence.enemyTemplates.map(
          (enemyTemplate) =>
            new MonsterTemplate({
              ...enemyTemplate,
              inventory: new Inventory({
                ...enemyTemplate.inventory,
                playableId: enemyTemplate.race,
                [StorageSpace.BACKPACK]: enemyTemplate.inventory.backpack.map(
                  (item) => ItemFactory.create(item as unknown as GameItem),
                ),
                [StorageSpace.GEAR]: enemyTemplate.inventory.gear.map((item) =>
                  ItemFactory.create(item as unknown as GameItem),
                ),
              }),
            }),
        ),
      }),
      playableEntities: new PlayableEntities({
        values: Object.values(persistence.playableEntities).map(
          (playableEntity) => PlayableEntityFactory.create(playableEntity),
        ),
      }),
      winConditions: new WinConditions({
        values: persistence.winConditions.map((winCondition) =>
          WinConditionFactory.create(winCondition),
        ),
      }),
      maxLevelLoot: persistence.maxLevelLoot,
      itemsLooted: persistence.itemsLooted,
      rooms: new Rooms({
        values: persistence.rooms.map(
          (room) =>
            new Room({
              ...room,
              boundingBoxes: room.boundingBoxes.map(
                (boundingBox) =>
                  new BoundingBox({
                    topLeft: new Coord(boundingBox.topLeft),
                    bottomRight: new Coord(boundingBox.bottomRight),
                  }),
              ),
            }),
        ),
      }),
      monstersKilled: persistence.monstersKilled,
    });
  }

  public toPersistence(domain: GameDomain): GamePersistence {
    const plain = domain.toPlain();

    return Object.assign(new GamePersistence(), {
      id: plain.id,
      host: plain.host,
      status: plain.status,
      playableEntities: plain.playableEntities.values.map((playableEntity) => {
        return playableEntity.faction === "hero"
          ? this.getHero({
              hero: playableEntity as ReturnType<Hero["toPlain"]>,
            })
          : this.getMonster({
              monster: playableEntity as ReturnType<Monster["toPlain"]>,
            });
      }),
      board: plain.board as GamePersistence["board"],
      gameMaster: plain.gameMaster,
      enemyTemplates: plain.monsterTemplates.values,
      events: plain.events.values as GameEvent[],
      winConditions: plain.winConditions
        .values as GameWinConditionsDeserialized,
      maxLevelLoot: plain.maxLevelLoot,
      itemsLooted: plain.itemsLooted,
      rooms: plain.rooms.values as GameRoomsDeserialized,
      monstersKilled: plain.monstersKilled,
    });
  }

  private getHero({ hero }: { hero: ReturnType<Hero["toPlain"]> }) {
    return {
      ...hero,
      currentPhase: hero.status.toLowerCase() as Lowercase<
        ReturnType<PlayerStatus["toPlain"]>
      >,
      conditions: hero.conditions.map((condition) => ({
        name: condition.name,
        remainingTurns: condition.remainingTurns,
      })),
    };
  }

  private getMonster({ monster }: { monster: ReturnType<Monster["toPlain"]> }) {
    return {
      ...monster,
      currentPhase: monster.status.toLowerCase() as Lowercase<
        ReturnType<PlayerStatus["toPlain"]>
      >,
      conditions: monster.conditions.map((condition) => ({
        name: condition.name,
        remainingTurns: condition.remainingTurns,
      })),
    };
  }
}
