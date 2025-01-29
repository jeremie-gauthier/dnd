import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ItemType } from "src/database/enums/item-type.enum";
import { ItemManaCostJson } from "src/modules/game/infra/database/entities/item/attack-item/spell.entity";
import { AttackItemResponseDto } from "./attack-item.dto";

export class SpellResponseDto extends AttackItemResponseDto {
  @Expose()
  @ApiProperty({ enum: [ItemType.SPELL], enumName: "ItemType_Spell" })
  override readonly type = ItemType.SPELL;

  @Expose()
  @ApiProperty({
    type: "object",
    additionalProperties: {
      type: "number",
    },
  })
  readonly manaCost: ItemManaCostJson;
}
