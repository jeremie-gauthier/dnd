import { GameWinConditionsDeserialized } from "src/modules/shared/interfaces/game-win-conditions-deserialized.interface";
import { Board } from "./board.type";
import { GameEvent } from "./game-event.type";
import { GameMaster } from "./game-master.type";
import { Item } from "./item.type";
import { MonsterTemplate } from "./monster-template.type";
import { PlayableEntity } from "./playable-entity/playable.type";

export type GamePersistence = {
  id: string;
  status: "PREPARE_FOR_BATTLE" | "BATTLE_ONGOING";
  board: Board;
  gameMaster: GameMaster;
  playableEntities: Record<PlayableEntity["id"], PlayableEntity>;
  events: Array<GameEvent>;
  enemyTemplates: Array<MonsterTemplate>;
  winConditions: GameWinConditionsDeserialized;
  maxLevelLoot: Item["level"];
};
