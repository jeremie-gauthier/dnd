import { Expose } from "class-transformer";

export class DiceResponseDto {
  @Expose()
  readonly name: string;

  @Expose()
  readonly values: [number, number, number, number, number, number];

  @Expose()
  readonly minValue: number;

  @Expose()
  readonly maxValue: number;

  @Expose()
  readonly meanValue: number;
}
