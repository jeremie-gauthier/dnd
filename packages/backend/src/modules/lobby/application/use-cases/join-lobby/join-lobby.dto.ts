import { Expose } from "class-transformer";
import { IsUUID } from "class-validator";

export class JoinLobbyInputDto {
  @IsUUID()
  readonly lobbyId: string;
}

export class JoinLobbyOutputDto {
  @Expose()
  readonly lobbyId: string;
}
