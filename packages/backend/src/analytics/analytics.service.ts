import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EventPayload } from 'src/event-emitter/event-payload.class';
import { AnalyticsEvent } from './events/types/events';

@Injectable()
export class AnalyticsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @OnEvent(AnalyticsEvent.OnAnyEvent, { async: true })
  public handleInteraction(data: EventPayload<any>) {
    console.log('spying event', data.name);
  }
}
