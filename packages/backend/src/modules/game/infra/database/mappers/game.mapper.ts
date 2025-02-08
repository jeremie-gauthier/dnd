import { Injectable } from "@nestjs/common";
import { GameEvents } from "src/modules/game/domain/game-events/game-events.aggregate";
import { GameMaster } from "src/modules/game/domain/game-master/game-master.entity";
import { GameStatus } from "src/modules/game/domain/game-status/game-status.vo";
import { Game as GameDomain } from "src/modules/game/domain/game/game.aggregate";
import { PlayableEntities } from "src/modules/game/domain/playable-entities/playable-entities.aggregate";
import { WinConditions } from "src/modules/game/domain/win-conditions/win-conditions.aggregate";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Game as GamePersistence } from "../entities/game.entity";
import { MonsterKilled as MonsterKilledPersistence } from "../entities/monster-killed.entity";
import { Room as RoomPersistence } from "../entities/room/room.entity";
import { PlayableEntityPersistence } from "../interfaces/playable-entity-persistence.interface";
import { BoardMapper } from "./board.mapper";
import { GameEventFactory } from "./factories/game-event.factory";
import { PlayableEntityFactory } from "./factories/playable-entity.factory";
import { WinConditionFactory } from "./factories/win-condition.factory";

@Injectable()
export class GameMapper extends Mapper<GamePersistence, GameDomain> {
  constructor(private readonly boardMapper: BoardMapper) {
    super();
  }

  public override toDomain({
    rooms,
    playableEntities,
    monstersKilled,
    ...persistence
  }: GamePersistence & {
    playableEntities: Array<PlayableEntityPersistence>;
    monstersKilled: Array<MonsterKilledPersistence>;
    rooms: Array<RoomPersistence>;
  }): GameDomain {
    return new GameDomain({
      id: persistence.id,
      host: persistence.gameMaster,
      status: new GameStatus(persistence.status),
      board: this.boardMapper.toDomain({ ...persistence.board, rooms }),
      events: new GameEvents({
        values: persistence.events.map((event) =>
          GameEventFactory.create(event.gameEvent),
        ),
      }),
      gameMaster: new GameMaster({ userId: persistence.gameMaster.userId }),
      playableEntities: new PlayableEntities({
        values: playableEntities.map((playableEntity) =>
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
      monstersKilled: monstersKilled.map(
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
