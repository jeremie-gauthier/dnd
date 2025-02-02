import { IsUUID } from "class-validator";

export class DiscardPlayableCharacterInputDto {
  @IsUUID()
  readonly lobbyId: string;

  @IsUUID()
  readonly playableCharacterId: string;
}
