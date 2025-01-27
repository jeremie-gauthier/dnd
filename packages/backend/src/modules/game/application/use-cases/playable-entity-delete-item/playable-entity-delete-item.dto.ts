import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class PlayableEntityDeleteItemInputDto {
  @IsUUID()
  readonly gameId: string;

  @IsString()
  @IsNotEmpty()
  readonly itemId: string;
}
