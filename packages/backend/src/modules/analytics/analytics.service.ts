import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type { EventPayload } from "src/interfaces/event-payload.interface";
import { AnalyticEvent } from "./events/types/analytic-event.enum";

@Injectable()
export class AnalyticsService {
  @OnEvent(AnalyticEvent.Any, { async: true })
  public handleInteraction(data: EventPayload<any>) {
    console.log("spying event", data.name);
  }
}
