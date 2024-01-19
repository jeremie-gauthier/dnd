/* eslint-disable @typescript-eslint/no-invalid-void-type */

type HasPayload<
  Dict extends Record<string, (...arguments_: any[]) => any>,
  Event extends keyof Dict,
> = Parameters<Dict[Event]> extends [] ? false : true;

type HasResponse<
  Dict extends Record<string, (...arguments_: any[]) => any>,
  Event extends keyof Dict,
> = ReturnType<Dict[Event]> extends void ? false : true;

type EventWithPayload<
  Dict extends Record<string, (...arguments_: any[]) => any>,
  Event extends keyof Dict,
> = HasResponse<Dict, Event> extends true
  ? (
      payload: Parameters<Dict[Event]>[number],
      callback: (response: ReturnType<Dict[Event]>) => void,
    ) => void
  : (payload: Parameters<Dict[Event]>[number]) => void;

type EventWithoutPayload<
  Dict extends Record<string, (...arguments_: any[]) => any>,
  Event extends keyof Dict,
> = HasResponse<Dict, Event> extends true
  ? (callback: (response: ReturnType<Dict[Event]>) => void) => void
  : () => void;

export type EventsMapper<Dict extends Record<string, (...arguments_: any[]) => any>> = {
  [Event in keyof Dict]: HasPayload<Dict, Event> extends true
    ? EventWithPayload<Dict, Event>
    : EventWithoutPayload<Dict, Event>;
};
