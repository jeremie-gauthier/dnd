import { Expose, Type } from "class-transformer";
import { CoordResponseDto } from "./coord.dto";

export class TileResponseDto {
  @Expose()
  @Type(() => CoordResponseDto)
  readonly coord: CoordResponseDto;

  @Expose()
  readonly isStartingTile: boolean;
}
