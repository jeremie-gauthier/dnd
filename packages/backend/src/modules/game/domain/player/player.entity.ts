import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { PlayerStatus } from "../player-status/player-status.vo";

type Data = {
  userId: string;
  status: PlayerStatus;
};

export class Player extends Entity<Data> {
  private static schema = z.object({
    userId: z.string(),
    status: z.instanceof(PlayerStatus),
  });

  constructor(rawData: Data) {
    const data = Player.schema.parse(rawData);
    super(data, data.userId);
  }
}
