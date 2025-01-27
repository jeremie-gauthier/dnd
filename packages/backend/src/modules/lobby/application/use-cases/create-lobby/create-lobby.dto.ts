import { PickType } from "@nestjs/swagger";
import { IsInt, IsUUID, Max, Min } from "class-validator";
import { Lobby } from "src/modules/lobby/infra/database/entities/lobby.entity";

export class CreateLobbyInputDto {
  @IsInt()
  @Min(2)
  @Max(5)
  readonly nbPlayersMax: number;

  @IsUUID()
  readonly stageId: string;
}

export class CreateLobbyOutputDto extends PickType(Lobby, [
  "id",
  "status",
  "host",
  "players",
  "playableCharacters",
]) {}
