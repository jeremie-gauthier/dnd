import { Expose } from "class-transformer";
import { ItemType } from "src/database/enums/item-type.enum";

export class ChestTrapResponseDto {
  @Expose()
  readonly type = ItemType.CHESTTRAP;
}
