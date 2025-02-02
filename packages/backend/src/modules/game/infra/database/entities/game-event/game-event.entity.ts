import { ApiProperty } from "@nestjs/swagger";
import {
  GameEventAction,
  GameEventActionType,
} from "../../enums/game-event-action.enum";
import {
  GameEventName,
  GameEventNameType,
} from "../../enums/game-event-name.enum";

export abstract class GameEvent {
  @ApiProperty({ enum: GameEventName, enumName: "GameEventName" })
  abstract readonly name: GameEventNameType;

  @ApiProperty({ enum: GameEventAction, enumName: "GameEventAction" })
  abstract readonly action: GameEventActionType;
}
