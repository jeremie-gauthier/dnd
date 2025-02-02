import { Expose } from "class-transformer";

type D6 = [number, number, number, number, number, number];

export class DiceResponseDto {
  @Expose()
  readonly name: string;

  @Expose()
  readonly values: D6;

  @Expose()
  readonly minValue: number;

  @Expose()
  readonly maxValue: number;

  @Expose()
  readonly meanValue: number;
}
