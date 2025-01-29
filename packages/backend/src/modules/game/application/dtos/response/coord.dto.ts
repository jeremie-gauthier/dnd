import { Expose } from "class-transformer";

export class CoordResponseDto {
  @Expose()
  readonly row: number;

  @Expose()
  readonly column: number;
}
