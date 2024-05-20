import { Injectable } from "@nestjs/common";
import { Dice } from "src/database/entities/dice.entity";

@Injectable()
export class DiceService {
  public roll({ dice }: { dice: Dice }): { dice: Dice; result: number } {
    return {
      dice,
      result: this.randChoice({ diceValues: dice.values }),
    };
  }

  private randChoice({ diceValues }: { diceValues: Dice["values"] }): number {
    const randIndex = Math.trunc(Math.random() * diceValues.length);
    return diceValues[randIndex]!;
  }
}
