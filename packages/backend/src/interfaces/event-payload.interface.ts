export interface EventPayload<EventName extends string> {
  readonly name: EventName;
}
