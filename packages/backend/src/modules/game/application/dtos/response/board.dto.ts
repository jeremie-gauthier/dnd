import { Expose } from "class-transformer";

export class BoardResponseDto {
  @Expose()
  readonly width: number;

  @Expose()
  readonly height: number;
}
