import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { PlayableEntityTurnEndedPayload } from "src/modules/shared/events/game/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/shared/events/game/playable-entity-turn-started.payload";
import { Game } from "../../domain/game/game.aggregate";

@Injectable()
export class TurnService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public emitAsyncTurnEvents({
    game,
    playingEntitiesWhoseTurnEnded,
    playingEntitiesWhoseTurnStarted,
  }: ReturnType<Game["endPlayerTurn"]> & { game: Game }) {
    const plainGame = game.toPlain();

    const lengthMax = Math.max(
      playingEntitiesWhoseTurnStarted.length,
      playingEntitiesWhoseTurnEnded.length,
    );
    for (let idx = 0; idx < lengthMax; idx += 1) {
      const playingEntityWhoseTurnEnded = playingEntitiesWhoseTurnEnded[idx];
      if (playingEntityWhoseTurnEnded) {
        this.eventEmitter.emitAsync(
          GameEvent.PlayableEntityTurnEnded,
          new PlayableEntityTurnEndedPayload({
            game: plainGame,
            playableEntity: playingEntityWhoseTurnEnded.toPlain(),
          }),
        );
      }

      const playingEntityWhoseTurnStarted =
        playingEntitiesWhoseTurnStarted[idx];
      if (playingEntityWhoseTurnStarted) {
        this.eventEmitter.emitAsync(
          GameEvent.PlayableEntityTurnStarted,
          new PlayableEntityTurnStartedPayload({
            game: plainGame,
            playableEntity: playingEntityWhoseTurnStarted.toPlain(),
          }),
        );
      }
    }
  }
}
