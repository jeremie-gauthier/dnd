import { Entity } from "src/modules/shared/domain/entity";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { UserStatus } from "../user-status/user-status.vo";

type Data = {
  userId: UniqueId;
  status: UserStatus;
};

export class User extends Entity<Data> {
  constructor(data: Data) {
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
