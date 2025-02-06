import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ItemType } from "src/modules/game/infra/database/enums/item-type.enum";
import { ItemResponseDto } from "./item.dto";

export class PotionResponseDto extends ItemResponseDto {
  @Expose()
  @ApiProperty({ enum: [ItemType.POTION], enumName: "ItemType_Potion" })
  override readonly type = ItemType.POTION;
}
