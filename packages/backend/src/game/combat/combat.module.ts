import { Module } from "@nestjs/common";
import { CombatService } from "./services/combat.service";

@Module({
  exports: [CombatService],
  providers: [CombatService],
})
export class CombatModule {}
