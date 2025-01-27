import { ApiProperty } from "@nestjs/swagger";
import { ItemType, ItemTypeType } from "src/database/enums/item-type.enum";

export abstract class Item {
  @ApiProperty({ enum: ItemType, enumName: "ItemType" })
  abstract readonly type: ItemTypeType;
  readonly name: string;
  readonly level: number;
}
