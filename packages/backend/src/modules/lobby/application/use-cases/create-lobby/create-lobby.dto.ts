import { PickType } from "@nestjs/swagger";
import { IsInt, IsUUID, Max, Min } from "class-validator";
import { LobbyResponseDto } from "../../dtos/response/lobby.dto";

export class CreateLobbyInputDto {
  @IsInt()
  @Min(2)
  @Max(5)
  readonly nbPlayersMax: number;

  @IsUUID()
  readonly stageId: string;
}

export class CreateLobbyOutputDto extends PickType(LobbyResponseDto, [
  "id",
  "status",
  "host",
  "players",
  "playableCharacters",
]) {}
