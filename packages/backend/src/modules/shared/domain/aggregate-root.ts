import { Entity } from "./entity";

type Data = {
  [x: string]: any;
};

export abstract class AggregateRoot<T extends Data> extends Entity<T> {}
