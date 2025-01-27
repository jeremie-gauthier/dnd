import { IsUUID } from "class-validator";

export class PickPlayableCharacterInputDto {
  @IsUUID()
  readonly lobbyId: string;

  @IsUUID()
  readonly playableCharacterId: string;
}
