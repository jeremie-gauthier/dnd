import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class PlayableEntityDrinkPotionInputDto {
  @IsUUID()
  readonly gameId: string;

  @IsString()
  @IsNotEmpty()
  readonly itemId: string;
}
