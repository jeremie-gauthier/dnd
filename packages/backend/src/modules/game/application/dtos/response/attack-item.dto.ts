import { Expose, Type } from "class-transformer";
import { AttackResponseDto } from "./attack.dto";
import { ItemResponseDto } from "./item.dto";

export abstract class AttackItemResponseDto extends ItemResponseDto {
  @Expose()
  @Type(() => AttackResponseDto)
  readonly attacks: Array<AttackResponseDto>;
}
