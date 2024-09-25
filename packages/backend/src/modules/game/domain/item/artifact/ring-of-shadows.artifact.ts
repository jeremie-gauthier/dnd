import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Artifact } from "./artifact.abstract";

export class RingOfShadows extends Artifact {
  constructor() {
    super({ level: 1, name: "ring_of_shadows_1", hasSavingThrow: true });
  }

  public use(_: {
    playableEntity: Playable;
    board: Board;
  }): void {
    throw new Error("Method not implemented.");
  }
}
