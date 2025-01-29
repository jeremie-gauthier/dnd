import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ItemType, ItemTypeType } from "src/database/enums/item-type.enum";

export abstract class ItemResponseDto {
  @Expose()
  @ApiProperty({ enum: ItemType, enumName: "ItemType" })
  abstract readonly type: ItemTypeType;

  @Expose()
  readonly name: string;

  @Expose()
  readonly level: number;

  @Expose()
  readonly imgUrl: string;
}
