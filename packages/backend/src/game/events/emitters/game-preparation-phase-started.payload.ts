import type { GameEntity, LobbyEntity } from "@dnd/shared";
import type { EventPayload } from "src/event-emitter/event-payload.class";
import type { MessageContext } from "src/types/socket.type";
import { GameEvent } from "./game-events.enum";

export class GamePreparationPhaseStartedPayload
  implements EventPayload<GameEvent.GamePreparationPhaseStarted>
{
  public readonly name = GameEvent.GamePreparationPhaseStarted;
  public readonly ctx: MessageContext;
  public readonly game: GameEntity;
  public readonly lobbyId: LobbyEntity["id"];

  constructor({
    ctx,
    game,
    lobbyId,
  }: Omit<GamePreparationPhaseStartedPayload, "name">) {
    this.ctx = ctx;
    this.game = game;
    this.lobbyId = lobbyId;
  }
}
