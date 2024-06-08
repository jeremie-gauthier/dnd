import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { AnalyticEvent } from "../../events/analytic-event.enum";
import { HandleAnyEventUseCase } from "../../use-cases/handle-any-event/handle-any-event.uc";

@Injectable()
export class AnalyticsListeners {
  constructor(private readonly handleAnyEventUseCase: HandleAnyEventUseCase) {}

  @OnEvent(AnalyticEvent.Any)
  public async anyEvent(payload: EventPayload<any>) {
    await this.handleAnyEventUseCase.execute(payload);
  }
}
