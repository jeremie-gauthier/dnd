import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Artifact } from "./artifact.abstract";

export class OrbOfLucidVision extends Artifact {
  constructor() {
    super({ level: 0, name: "orb_of_lucid_vision_1", hasSavingThrow: false });
  }

  public use(_: {
    playableEntity: Playable;
    board: Board;
  }): void {
    throw new Error("Method not implemented.");
  }
}
