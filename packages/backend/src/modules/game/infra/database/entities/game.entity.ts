import { Board } from "./board.entity";
import { GameEvent } from "./game-event/game-event.entity";
import { GameMaster } from "./game-master.entity";
import { Item } from "./item/item.entity";
import { MonsterTemplate } from "./monster-template.entity";
import { PlayableEntity } from "./playable-entity/playable-entity.entity";
import { Room } from "./room/room.entity";
import { WinCondition } from "./win-condition/win-condition.entity";

export class Game {
  readonly id: string;
  readonly status: "PREPARE_FOR_BATTLE" | "BATTLE_ONGOING";
  readonly board: Board;
  readonly gameMaster: GameMaster;
  readonly playableEntities: Record<PlayableEntity["id"], PlayableEntity>;
  readonly events: Array<GameEvent>;
  readonly enemyTemplates: Array<MonsterTemplate>;
  readonly winConditions: Array<WinCondition>;
  readonly maxLevelLoot: Item["level"];
  readonly itemsLooted: Array<Item["name"]>;
  readonly rooms: Array<Room>;
  readonly monstersKilled: Array<string>;
}
