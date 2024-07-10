import { Board } from "./board.type";
import { GameEvent } from "./game-event.type";
import { GameMaster } from "./game-master.type";
import { MonsterTemplate } from "./playable-entity/monster-template.type";
import { PlayableEntity } from "./playable-entity/playable.type";

export type GamePersistence = {
  id: string;
  status: "PREPARE_FOR_BATTLE" | "BATTLE_ONGOING";
  board: Board;
  gameMaster: GameMaster;
  playableEntities: Record<PlayableEntity["id"], PlayableEntity>;
  events: Array<GameEvent>;
  enemyTemplates: Array<MonsterTemplate>;
};
