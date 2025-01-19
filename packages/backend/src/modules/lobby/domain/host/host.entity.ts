import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { User } from "../user/user.entity";
import { HostError } from "./host.error";

type Data = {
  userId: string;
};

export class Host extends Entity<Data> {
  private static schema = z.object({
    userId: z.string(),
  });

  constructor(rawData: Data) {
    const data = Host.schema.parse(rawData);
    super(data, data.userId);
  }

  public override toPlain() {
    return {
      userId: this._data.userId,
    };
  }

  public mustBeHost({ userId }: { userId: User["id"] }) {
    if (this.id !== userId) {
      throw new HostError({
        name: "USER_NOT_HOST",
        message: "User is not the host of the lobby",
      });
    }
  }
}
