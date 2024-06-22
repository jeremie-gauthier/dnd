import { Entity } from "src/modules/shared/domain/entity";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { z } from "zod";
import { UserStatus } from "../user-status/user-status.vo";

type Data = {
  userId: UniqueId;
  status: UserStatus;
};

export class User extends Entity<Data> {
  private static schema = z.object({
    userId: z.instanceof(UniqueId),
    status: z.instanceof(UserStatus),
  });

  constructor(rawData: Data) {
    const data = User.schema.parse(rawData);
    super(data, data.userId);
  }

  public get status() {
    return this._data.status;
  }

  public toggleStatus() {
    this._data.status = this._data.status.toggle();
  }

  public setNotReadyStatus() {
    this._data.status = this._data.status.setNotReady();
  }
}
