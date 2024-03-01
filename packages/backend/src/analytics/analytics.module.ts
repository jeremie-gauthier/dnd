import { Module } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";

@Module({
  imports: [],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
