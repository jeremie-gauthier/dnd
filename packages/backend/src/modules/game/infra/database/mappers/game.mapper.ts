import { Board } from "src/modules/game/domain/board/board.entity";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { GameEvents } from "src/modules/game/domain/game-events/game-events.aggregate";
import { GameMaster } from "src/modules/game/domain/game-master/game-master.entity";
import { GameStatus } from "src/modules/game/domain/game-status/game-status.vo";
import { Game as GameDomain } from "src/modules/game/domain/game/game.aggregate";
import { PlayableEntities } from "src/modules/game/domain/playable-entities/playable-entities.aggregate";
import { BoundingBox } from "src/modules/game/domain/rooms/room/bounding-box/bounding-box.entity";
import { Room } from "src/modules/game/domain/rooms/room/room.entity";
import { Rooms } from "src/modules/game/domain/rooms/rooms.aggregate";
import { Tile } from "src/modules/game/domain/tile/tile.entity";
import { WinConditions } from "src/modules/game/domain/win-conditions/win-conditions.aggregate";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Game as GamePersistence } from "../entities/game.entity";
import { TileEntityType } from "../enums/tile-entity-type.enum";
import { GameEventFactory } from "./factories/game-event.factory";
import { PlayableEntityFactory } from "./factories/playable-entity.factory";
import { TileEntityFactory } from "./factories/tile-entity.factory";
import { WinConditionFactory } from "./factories/win-condition.factory";

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
                              playableEntity.id === tileEntity.id,
                          )!,
                        )
                      : undefined,
                }),
              ),
            }),
        ),
        rooms: new Rooms({
          values: persistence.board.rooms.map(
            (room) =>
              new Room({
                id: room.id,
                hasBeenVisited: room.hasBeenVisited,
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
      }),
      events: new GameEvents({
        values: persistence.events.map((event) =>
          GameEventFactory.create(event),
        ),
      }),
      gameMaster: new GameMaster({ userId: persistence.gameMaster.userId }),
      playableEntities: new PlayableEntities({
        values: persistence.playableEntities.map((playableEntity) =>
          PlayableEntityFactory.create(playableEntity),
        ),
      }),
      winConditions: new WinConditions({
        values: persistence.winConditions.map((winCondition) =>
          WinConditionFactory.create(winCondition),
        ),
      }),
      maxLevelLoot: persistence.maxLevelLoot,
      itemsLooted: persistence.itemsLooted.map((item) => item.name),
      monstersKilled: persistence.monstersKilled.map(
        (monsterKilled) => monsterKilled.monsterTemplate.race,
      ),
    });
  }

  public toPersistence(domain: GameDomain): GamePersistence {
    const plain = domain.toPlain();

    return Object.assign(new GamePersistence(), {
      id: plain.id,
      host: plain.host,
      status: plain.status,
      playableEntities: plain.playableEntities.values,
      board: plain.board,
      gameMaster: plain.gameMaster,
      events: plain.events.values,
      winConditions: plain.winConditions.values,
      maxLevelLoot: plain.maxLevelLoot,
      itemsLooted: plain.itemsLooted,
      monstersKilled: plain.monstersKilled,
    });
  }
}
