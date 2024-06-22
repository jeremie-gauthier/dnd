import { Module } from "@nestjs/common";
import { AnalyticsListeners } from "./infra/controller/analytics.listeners";
import { HandleAnyEventUseCase } from "./use-cases/handle-any-event/handle-any-event.uc";

@Module({
  imports: [],
  controllers: [],
  providers: [AnalyticsListeners, HandleAnyEventUseCase],
})
export class AnalyticsModule {}
