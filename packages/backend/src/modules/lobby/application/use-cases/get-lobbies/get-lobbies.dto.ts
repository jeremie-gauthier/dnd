import { PickType } from "@nestjs/swagger";
import { Lobby } from "src/modules/lobby/infra/database/entities/lobby.entity";

export class GetLobbiesOutputDto extends PickType(Lobby, [
  "id",
  "host",
  "config",
]) {
  readonly nbPlayers: number;
}
