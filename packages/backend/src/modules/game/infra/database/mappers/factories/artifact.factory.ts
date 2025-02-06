import { ArtifactApplicationFactory } from "src/modules/game/application/factories/artifact.factory";
import { Artifact as ArtifactDomain } from "src/modules/game/domain/item/artifact/artifact.abstract";
import { Artifact as ArtifactPersistence } from "src/modules/game/infra/database/entities/item/artifact.entity";

export class ArtifactFactory {
  private constructor() {}

  public static create(artifact: ArtifactPersistence): ArtifactDomain {
    return ArtifactApplicationFactory.create(artifact.name);
  }
}
