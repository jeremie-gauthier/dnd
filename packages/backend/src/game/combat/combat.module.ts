import { Module } from "@nestjs/common";
import { CombatService } from "./services/combat/combat.service";

@Module({
  exports: [CombatService],
  providers: [CombatService],
})
export class CombatModule {}
