import { ValueObject } from "src/modules/shared/domain/value-object";
import { UserStatusError } from "./user-status.error";

export class UserStatus extends ValueObject<boolean> {
  public get isReady() {
    return this._data;
  }

  public equals(other: UserStatus): boolean {
    return this.isReady === other.isReady;
  }

  public toggle(): UserStatus {
    return new UserStatus(!this.isReady);
  }

  public setNotReady(): UserStatus {
    return new UserStatus(false);
  }

  public mustNotBeReady() {
    if (this.isReady) {
      throw new UserStatusError({
        name: "BAD_USER_STATUS",
        message: "Expected User to not be ready",
      });
    }
  }
}
