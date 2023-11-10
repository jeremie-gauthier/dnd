export type MessageEventHandler<T> = (data: T) => void;

export type ToHandlers<Handlers extends Record<string, any>> = {
  [EventName in keyof Handlers]: MessageEventHandler<Handlers[EventName]>;
};
