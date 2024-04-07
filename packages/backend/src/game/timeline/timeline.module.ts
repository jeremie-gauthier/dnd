import { Module } from "@nestjs/common";
import { InitiativeService } from "./services/initiative/initiative.service";

@Module({
  exports: [InitiativeService],
  providers: [InitiativeService],
})
export class TimelineModule {}
