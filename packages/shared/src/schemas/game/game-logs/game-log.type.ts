import { EndTurnActionLog } from "./action-log";
import { MoveActionLog } from "./action-log/move-log.interface";
import { StartTurnActionLog } from "./action-log/start-turn-log.interface";

export type GameLog = MoveActionLog | EndTurnActionLog | StartTurnActionLog;
