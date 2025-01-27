import { Type } from "class-transformer";
import { IsArray, IsInt, IsPositive, IsUUID } from "class-validator";

class CoordDto {
  @IsInt()
  @IsPositive()
  readonly row: number;

  @IsInt()
  @IsPositive()
  readonly column: number;
}

export class PlayableEntityMoveInputDto {
  @IsUUID()
  readonly gameId: string;

  @IsArray()
  @Type(() => CoordDto)
  readonly pathToTile: Array<CoordDto>;
}
