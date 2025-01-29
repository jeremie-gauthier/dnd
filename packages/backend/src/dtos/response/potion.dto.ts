import { Expose } from "class-transformer";
import { ItemType } from "src/database/enums/item-type.enum";

export class PotionResponseDto {
  @Expose()
  readonly type = ItemType.POTION;
}
