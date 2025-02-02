import { Type } from "class-transformer";
import { IsInt, IsPositive, IsUUID } from "class-validator";

class CoordDto {
  @IsInt()
  @IsPositive()
  readonly row: number;

  @IsInt()
  @IsPositive()
  readonly column: number;
}

export class PlayableEntityOpenDoorInputDto {
  @IsUUID()
  readonly gameId: string;

  @Type(() => CoordDto)
  readonly coordOfTileWithDoor: CoordDto;
}
