import { Module, forwardRef } from "@nestjs/common";
import { CombatModule } from "../combat/combat.module";
import { TrapService } from "./services/trap/trap.service";

@Module({
  imports: [forwardRef(() => CombatModule)],
  exports: [TrapService],
  providers: [TrapService],
})
export class TrapModule {}
