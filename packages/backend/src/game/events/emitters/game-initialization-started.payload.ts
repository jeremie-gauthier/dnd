import type { LobbyEntity } from "@dnd/shared";
import type { EventPayload } from "src/event-emitter/event-payload.class";
import type { MessageContext } from "src/types/socket.type";
import { GameEvent } from "./game-events.enum";

export class GameInitializationStartedPayload
  implements EventPayload<GameEvent.GameInitializationStarted>
{
  public readonly name = GameEvent.GameInitializationStarted;
  public readonly ctx: MessageContext;
  public readonly lobbyId: LobbyEntity["id"];

  constructor({
    ctx,
    lobbyId,
  }: Omit<GameInitializationStartedPayload, "name">) {
    this.ctx = ctx;
    this.lobbyId = lobbyId;
  }
}
