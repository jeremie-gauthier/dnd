import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class PlayableEntityAttackInputDto {
  @IsUUID()
  readonly gameId: string;

  @IsUUID()
  readonly attackId: string;

  @IsString()
  @IsNotEmpty()
  readonly targetPlayableEntityId: string;
}
