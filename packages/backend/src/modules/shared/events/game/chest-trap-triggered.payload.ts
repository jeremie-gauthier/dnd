import type { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { ChestTrap } from "src/modules/game/domain/item/chest-trap/chest-trap.abstract";
import { Playable } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { GameEvent } from "./game-event.enum";

export class ChestTrapTriggeredPayload
  implements EventPayload<GameEvent.ChestTrapTriggered>
{
  public readonly name = GameEvent.ChestTrapTriggered;
  public readonly chestTrapItem: ReturnType<ChestTrap["toPlain"]>;
  public readonly game: ReturnType<Game["toPlain"]>;
  public readonly subjectEntity: ReturnType<Playable["toPlain"]>;

  constructor({
    chestTrapItem,
    game,
    subjectEntity,
  }: Omit<ChestTrapTriggeredPayload, "name">) {
    this.chestTrapItem = chestTrapItem;
    this.game = game;
    this.subjectEntity = subjectEntity;
  }
}
