import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ItemType } from "src/database/enums/item-type.enum";
import { ItemResponseDto } from "./item.dto";

export class ChestTrapResponseDto extends ItemResponseDto {
  @Expose()
  @ApiProperty({ enum: [ItemType.CHESTTRAP], enumName: "ItemType_ChestTrap" })
  readonly type = ItemType.CHESTTRAP;
}
