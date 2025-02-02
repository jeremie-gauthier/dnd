import { PickType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { LobbyResponseDto } from "../../dtos/response/lobby.dto";

class LobbyDto extends PickType(LobbyResponseDto, ["id", "host", "config"]) {
  @Expose()
  readonly nbPlayers: number;
}

export class GetLobbiesOutputDto {
  @Expose()
  @Type(() => LobbyDto)
  readonly data: Array<LobbyDto>;

  @Expose()
  readonly count: number;
}
