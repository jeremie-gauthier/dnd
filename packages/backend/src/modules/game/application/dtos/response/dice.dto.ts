import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class DiceResponseDto {
  @Expose()
  readonly name: string;

  @Expose()
  @ApiProperty({
    type: "array",
    items: {
      minLength: 6,
      maxLength: 6,
      type: "number",
    },
  })
  readonly values: [number, number, number, number, number, number];

  @Expose()
  readonly minValue: number;

  @Expose()
  readonly maxValue: number;

  @Expose()
  readonly meanValue: number;
}
