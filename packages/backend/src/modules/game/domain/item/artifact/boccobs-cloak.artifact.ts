import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Artifact } from "./artifact.abstract";

export class BoccobsCloak extends Artifact {
  constructor() {
    super({ level: 0, name: "boccobs_cloak_1", hasSavingThrow: true });
  }

  public use(_: {
    playableEntity: Playable;
    board: Board;
  }): void {
    throw new Error("Method not implemented.");
  }
}
