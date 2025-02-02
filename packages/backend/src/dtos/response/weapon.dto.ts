import { Expose } from "class-transformer";
import { ItemType } from "src/database/enums/item-type.enum";

export class WeaponResponseDto {
  @Expose()
  readonly type = ItemType.WEAPON;
}
