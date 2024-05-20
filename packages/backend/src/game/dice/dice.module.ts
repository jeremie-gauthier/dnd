import { Module } from "@nestjs/common";
import { DiceService } from "./services/dice/dice.service";

@Module({
  exports: [DiceService],
  providers: [DiceService],
})
export class DiceModule {}
