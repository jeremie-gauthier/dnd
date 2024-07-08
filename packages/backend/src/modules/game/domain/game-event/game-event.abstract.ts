import { Entity, PlainData } from "src/modules/shared/domain/entity";

type Data = {
  readonly name: string;
  readonly action: string;
  [key: string]: any;
};

export abstract class GameEvent<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  public abstract toPlain(): PlainData<ChildData>;
}
