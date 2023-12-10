import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AnalyticsEvent } from './types/events';

@Injectable()
export class AnalyticsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @OnEvent(AnalyticsEvent.OnAnyEvent, { async: true })
  public handleInteraction(data: unknown) {
    console.log('spying event', data);
  }
}
