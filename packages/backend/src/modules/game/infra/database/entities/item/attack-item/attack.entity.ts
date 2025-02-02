import { AttackRangeType } from "src/database/enums/attack-range.enum";
import { AttackTypeType } from "src/database/enums/attack-type.enum";
import { Dice } from "../dice.entity";
import { Perk } from "../perk.entity";

export class Attack {
  readonly id: string;
  readonly range: AttackRangeType;
  readonly type: AttackTypeType;
  dices: Array<Dice>;
  perks: Array<Perk>;
}
