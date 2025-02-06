import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  AttackRange,
  AttackRangeType,
} from "src/modules/game/infra/database/enums/attack-range.enum";
import {
  AttackType,
  AttackTypeType,
} from "src/modules/game/infra/database/enums/attack-type.enum";
import { DiceResponseDto } from "./dice.dto";
import { PerkResponseDto } from "./perk.dto";

export class AttackResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({ enum: AttackRange, enumName: "AttackRange" })
  readonly range: AttackRangeType;

  @Expose()
  @ApiProperty({ enum: AttackType, enumName: "AttackType" })
  readonly type: AttackTypeType;

  @Expose()
  readonly dices: Array<DiceResponseDto>;

  @Expose()
  readonly perks: Array<PerkResponseDto>;
}
