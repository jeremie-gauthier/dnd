import { IsUUID } from "class-validator";

export class StartGameInputDto {
  @IsUUID()
  readonly lobbyId: string;
}
