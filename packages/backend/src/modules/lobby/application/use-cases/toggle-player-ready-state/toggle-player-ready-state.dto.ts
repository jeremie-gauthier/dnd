import { IsUUID } from "class-validator";

export class TogglePlayerReadyStateInputDto {
  @IsUUID()
  readonly lobbyId: string;
}
