import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ItemType, ItemTypeType } from "src/database/enums/item-type.enum";
import { PerkNameType } from "src/database/enums/perk-name.enum";

export class ItemResponseDto {
  @Expose()
  readonly name: PerkNameType;

  @Expose()
  @ApiProperty({ enum: ItemType, enumName: "ItemType" })
  readonly type: ItemTypeType;

  @Expose()
  readonly level: number;

  @Expose()
  readonly isLootableInChest: boolean;

  @Expose()
  readonly imgUrl: string;
}
