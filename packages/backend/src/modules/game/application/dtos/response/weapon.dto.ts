import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ItemType } from "src/modules/game/infra/database/enums/item-type.enum";
import { AttackItemResponseDto } from "./attack-item.dto";

export class WeaponResponseDto extends AttackItemResponseDto {
  @Expose()
  @ApiProperty({ enum: [ItemType.WEAPON], enumName: "ItemType_Weapon" })
  override readonly type = ItemType.WEAPON;
}
