import { IsUUID } from "class-validator";

export class JoinLobbyInputDto {
  @IsUUID()
  readonly lobbyId: string;
}

export class JoinLobbyOutputDto {
  readonly lobbyId: string;
}
