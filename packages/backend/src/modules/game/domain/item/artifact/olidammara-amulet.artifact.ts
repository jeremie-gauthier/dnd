import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Artifact } from "./artifact.abstract";

export class OlidammaraAmulet extends Artifact {
  constructor() {
    super({ level: 1, name: "olidammara_amulet_1", hasSavingThrow: false });
  }

  public use(_: {
    playableEntity: Playable;
    board: Board;
  }): void {
    throw new Error("Method not implemented.");
  }
}
