import { Module } from "@nestjs/common";
import { CombatModule } from "../combat/combat.module";
import { TrapService } from "./services/trap.service";

@Module({
  imports: [CombatModule],
  exports: [TrapService],
  providers: [TrapService],
})
export class TrapModule {}
