import { IsUUID } from "class-validator";

export class PlayableEntityEndTurnInputDto {
  @IsUUID()
  readonly gameId: string;
}
