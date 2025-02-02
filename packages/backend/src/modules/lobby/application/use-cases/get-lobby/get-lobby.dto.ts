import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";
import { Lobby } from "src/modules/lobby/infra/database/entities/lobby.entity";
import { LobbyResponseDto } from "../../dtos/response/lobby.dto";

export class GetLobbyInputParamsDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly lobbyId: Lobby["id"];
}

export class GetLobbyOutputDto extends LobbyResponseDto {}
