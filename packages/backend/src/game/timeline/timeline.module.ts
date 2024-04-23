import { Module } from "@nestjs/common";
import { InitiativeService } from "./services/initiative/initiative.service";
import { TurnService } from "./services/turn/turn.service";

@Module({
  exports: [InitiativeService, TurnService],
  providers: [InitiativeService, TurnService],
})
export class TimelineModule {}
