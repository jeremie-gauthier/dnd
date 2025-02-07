import { JoinColumn, OneToOne, Relation, RelationId } from "typeorm";
import { Lobby } from "./lobby.entity";
import { Player } from "./player.entity";

export class Host {
  @OneToOne(() => Player)
  @JoinColumn()
  readonly player: Relation<Player>;

  @RelationId((lobby: Lobby) => lobby.host.player)
  readonly userId: Relation<Player["userId"]>;
}
