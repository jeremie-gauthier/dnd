import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {
  ItemType,
  ItemTypeType,
} from "src/modules/game/infra/database/enums/item-type.enum";
import { ItemPerkResponseDto } from "./item-perk.dto";

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

  @Expose()
  @Type(() => ItemPerkResponseDto)
  readonly itemPerks: Array<ItemPerkResponseDto>;
}
