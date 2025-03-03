import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Artifact, ArtifactData } from "./artifact.abstract";

export class OrbOfLucidVision extends Artifact {
  constructor(rawData: Omit<ArtifactData, "name" | "type">) {
    super({ ...rawData, name: "orb_of_lucid_vision_1" });
  }

  public override use(_: {
    playableEntity: Playable;
    board: Board;
  }): void {
    throw new Error("Method not implemented.");
  }
}
