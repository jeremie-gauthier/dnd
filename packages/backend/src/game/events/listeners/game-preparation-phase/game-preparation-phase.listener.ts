import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { GameEvent } from "../../emitters/game-events.enum";
import type { GameInitializationDonePayload } from "../../emitters/game-initialization-done.payload";
import type { GamePreparationPhaseRepository } from "./game-preparation-phase.repository";

@Injectable()
export class GamePreparationPhaseListener {
  constructor(private readonly repository: GamePreparationPhaseRepository) {}

  @OnEvent(GameEvent.GameInitializationDone)
  public async handler(payload: GameInitializationDonePayload) {}
}
