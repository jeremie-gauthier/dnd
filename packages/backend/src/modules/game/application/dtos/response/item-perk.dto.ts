import { Expose, Type } from "class-transformer";
import { DiceResponseDto } from "./dice.dto";
import { PerkResponseDto } from "./perk.dto";

export class ItemPerkResponseDto {
  @Expose()
  @Type(() => PerkResponseDto)
  readonly perk: PerkResponseDto;

  @Expose()
  @Type(() => DiceResponseDto)
  readonly dices: Array<DiceResponseDto>;
}
