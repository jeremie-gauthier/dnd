import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ItemType } from "src/modules/game/infra/database/enums/item-type.enum";
import { AttackItemResponseDto } from "./attack-item.dto";
import { ManaCostResponseDto } from "./mana-cost.dto";

export class SpellResponseDto extends AttackItemResponseDto {
  @Expose()
  @ApiProperty({ enum: [ItemType.SPELL], enumName: "ItemType_Spell" })
  override readonly type = ItemType.SPELL;

  @Expose()
  @Type(() => ManaCostResponseDto)
  readonly manaCosts: Array<ManaCostResponseDto>;
}
