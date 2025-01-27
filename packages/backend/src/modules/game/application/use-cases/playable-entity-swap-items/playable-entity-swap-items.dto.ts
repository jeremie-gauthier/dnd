import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class PlayableEntitySwapItemsInputDto {
  @IsUUID()
  readonly gameId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly gearItemId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly backpackItemId?: string;
}
