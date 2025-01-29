import { PickType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Lobby } from "src/modules/lobby/infra/database/entities/lobby.entity";

class LobbyDto extends PickType(Lobby, ["id", "host", "config"]) {
  @Expose()
  readonly nbPlayers: number;
}

export class GetLobbiesOutputDto {
  @Expose()
  readonly data: Array<LobbyDto>;

  @Expose()
  readonly count: number;
}
