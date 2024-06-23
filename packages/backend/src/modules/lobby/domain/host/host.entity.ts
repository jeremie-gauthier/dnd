import { Entity } from "src/modules/shared/domain/entity";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { User } from "../user/user.entity";
import { HostError } from "./host.error";

type Data = {
  userId: UniqueId;
};

export class Host extends Entity<Data> {
  constructor(data: Data) {
    super(data, data.userId);
  }

  public mustBeHost({ userId }: { userId: User["id"] }) {
    if (!this.id.equals(userId)) {
      throw new HostError({
        name: "USER_NOT_HOST",
        message: "User is not the host of the lobby",
      });
    }
  }
}
