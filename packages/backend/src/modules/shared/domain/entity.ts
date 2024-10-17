import { randomUUID } from "node:crypto";
import { Plainable } from "src/interfaces/plainable.interface";
import { DomainEvent } from "src/modules/game/domain/domain-events/domain-event.interface";
import { type ValueObject } from "./value-object";

type Data = {
  [x: string]: any;
};

export type PlainData<TData extends Data> = {
  [key in keyof TData]: TData[key] extends Entity<any> | ValueObject<any>
    ? ReturnType<TData[key]["toPlain"]>
    : TData[key] extends Array<infer ArrayItem>
      ? ArrayItem extends Entity<any> | ValueObject<any>
        ? PlainData<ArrayItem["toPlain"]>
        : TData[key]
      : TData[key];
};

export abstract class Entity<T extends Data>
  implements Plainable<PlainData<T>>
{
  private readonly _id: string;
  public abstract toPlain(): PlainData<T>;
  public readonly domainEvents: Array<DomainEvent> = [];

  constructor(
    protected readonly _data: T,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
  }

  public get id() {
    return this._id;
  }

  public equals(other: Entity<T>): boolean {
    if (this === other) {
      return true;
    }

    if (!(other instanceof Entity)) {
      return false;
    }

    return this.id === other.id;
  }

  public addDomainEvent(event: DomainEvent) {
    this.domainEvents.push(event);
  }

  public addDomainEvents(events: Array<DomainEvent>) {
    this.domainEvents.push(...events);
  }

  public collectDomainEvents() {
    return this.domainEvents;
  }
}
