export abstract class EventPayload<EventName extends string> {
  public readonly name: EventName;
}
