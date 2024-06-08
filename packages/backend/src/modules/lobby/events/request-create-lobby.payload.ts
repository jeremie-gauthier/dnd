import { CreateLobbyInput } from "@dnd/shared";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { LobbyEvent } from "./lobby-event.enum";

export class RequestCreateLobbyPayload
  implements EventPayload<LobbyEvent.RequestCreateLobby>
{
  public readonly name = LobbyEvent.RequestCreateLobby;
  public readonly config: CreateLobbyInput;
  public readonly stageId: string;
  public readonly userId: string;

  constructor({
    config,
    stageId,
    userId,
  }: Omit<RequestCreateLobbyPayload, "name">) {
    this.config = config;
    this.stageId = stageId;
    this.userId = userId;
  }
}
