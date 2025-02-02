import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  AttackRange,
  AttackRangeType,
} from "src/database/enums/attack-range.enum";
import {
  AttackType,
  AttackTypeType,
} from "src/database/enums/attack-type.enum";

export class AttackResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({ enum: AttackRange, enumName: "AttackRange" })
  readonly range: AttackRangeType;

  @Expose()
  @ApiProperty({ enum: AttackType, enumName: "AttackType" })
  readonly type: AttackTypeType;
}
