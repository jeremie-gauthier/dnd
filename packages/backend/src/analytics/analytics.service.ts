import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type { EventPayload } from "src/shared/event-payload.abstract";
import { AnalyticsEvent } from "./events/types/events";

@Injectable()
export class AnalyticsService {
  @OnEvent(AnalyticsEvent.OnAnyEvent, { async: true })
  public handleInteraction(data: EventPayload<any>) {
    console.log("spying event", data.name);
  }
}
