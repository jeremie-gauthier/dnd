import type { GameEntity, LobbyEntity } from "@dnd/shared";
import type { EventPayload } from "src/event-emitter/event-payload.class";
import type { MessageContext } from "src/types/socket.type";
import { GameEvent } from "./game-events.enum";

export class GameInitializationDonePayload
  implements EventPayload<GameEvent.GameInitializationDone>
{
  public readonly name = GameEvent.GameInitializationDone;
  public readonly ctx: MessageContext;
  public readonly lobbyId: LobbyEntity["id"];
  public readonly game: GameEntity;

  constructor({
    ctx,
    lobbyId,
    game,
  }: Omit<GameInitializationDonePayload, "name">) {
    this.ctx = ctx;
    this.lobbyId = lobbyId;
    this.game = game;
  }
}
