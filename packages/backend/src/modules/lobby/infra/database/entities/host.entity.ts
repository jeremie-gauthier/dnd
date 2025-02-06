import { JoinColumn, OneToOne, Relation, RelationId } from "typeorm";
import { Player } from "./player.entity";

export class Host {
  @OneToOne(() => Player)
  @JoinColumn()
  readonly player: Relation<Player>;

  @RelationId((host: Host) => host.player)
  readonly userId: Relation<Player["userId"]>;
}
