import { StorageSpace } from "@dnd/shared";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { HeroClassType } from "src/database/enums/hero-class.enum";
import { ItemType } from "src/database/enums/item-type.enum";

export type ItemManaCostJson = Partial<Record<HeroClassType, number>>;

export class SpellResponseDto {
  @Expose()
  readonly type = ItemType.SPELL;

  @Expose()
  @ApiProperty({ enum: StorageSpace, enumName: "StorageSpace" })
  readonly manaCost: ItemManaCostJson;
}
