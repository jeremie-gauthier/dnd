import { Board } from "../../board/board.entity";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { Artifact, ArtifactData } from "./artifact.abstract";

export class SummonersHorn extends Artifact {
  constructor(rawData: Omit<ArtifactData, "name" | "type">) {
    super({ ...rawData, name: "summoners_horn_1" });
  }

  public override use(_: {
    playableEntity: Playable;
    board: Board;
  }): void {
    throw new Error("Method not implemented.");
  }
}
