import { Artifact as ArtifactDomain } from "../../domain/item/artifact/artifact.abstract";
import { BarkSkinCloak } from "../../domain/item/artifact/bark-skin-cloak.artifact";
import { BoccobsCloak } from "../../domain/item/artifact/boccobs-cloak.artifact";
import { OlidammaraAmulet } from "../../domain/item/artifact/olidammara-amulet.artifact";
import { OrbOfLucidVision } from "../../domain/item/artifact/orb-of-lucid-vision.artifact";
import { RingOfShadows } from "../../domain/item/artifact/ring-of-shadows.artifact";
import { SummonersHorn } from "../../domain/item/artifact/summoners-horn.artifact";
import { YonddallaAmulet } from "../../domain/item/artifact/yonddalla-amulet.artifact";
import { ItemType } from "../../infra/database/enums/item-type.enum";

export class ArtifactApplicationFactory {
  private constructor() {}

  public static create(artifactName: string): ArtifactDomain {
    switch (artifactName) {
      case "orb_of_lucid_vision_1":
        return new OrbOfLucidVision();
      case "boccobs_cloak_1":
        return new BoccobsCloak();
      case "yonddalla_amulet_1":
        return new YonddallaAmulet();
      case "ring_of_shadows_1":
        return new RingOfShadows();
      case "summoners_horn_1":
        return new SummonersHorn();
      case "bark_skin_cloak_1":
        return new BarkSkinCloak();
      case "olidammara_amulet_1":
        return new OlidammaraAmulet();
      default:
        throw new Error(`No "${artifactName}" ${ItemType.ARTIFACT} item found`);
    }
  }
}
