import { IsUUID } from "class-validator";

export class ListenLobbyChangesInputDto {
  @IsUUID()
  readonly lobbyId: string;
}
