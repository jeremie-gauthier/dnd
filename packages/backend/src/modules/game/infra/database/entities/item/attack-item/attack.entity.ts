import { ApiProperty } from "@nestjs/swagger";
import {
  AttackRange,
  AttackRangeType,
} from "src/database/enums/attack-range.enum";
import {
  AttackType,
  AttackTypeType,
} from "src/database/enums/attack-type.enum";
import { Dice } from "../dice.entity";
import { Perk } from "../perk.entity";

export class Attack {
  id: string;
  @ApiProperty({ enum: AttackRange, enumName: "AttackRange" })
  range: AttackRangeType;
  @ApiProperty({ enum: AttackType, enumName: "AttackType" })
  type: AttackTypeType;
  dices: Array<Dice>;
  perks: Array<Perk>;
}
