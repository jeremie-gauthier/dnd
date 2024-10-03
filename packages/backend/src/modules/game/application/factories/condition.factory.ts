import { BrokenArmor } from "../../domain/playable-entities/playable-entity/conditions/condition/broken-armor.condition";
import { Condition } from "../../domain/playable-entities/playable-entity/conditions/condition/condition.abstract";
import { Stopped } from "../../domain/playable-entities/playable-entity/conditions/condition/stopped.condition";
import { Weakness } from "../../domain/playable-entities/playable-entity/conditions/condition/weakness.condition";
import { PlayableEntityCondition } from "../../infra/database/game/model/playable-entity/condition.type";

export class ConditionFactory {
  private constructor() {}

  public static create(data: PlayableEntityCondition): Condition {
    switch (data.name) {
      case "stopped":
        return new Stopped(data);
      case "brokenArmor":
        return new BrokenArmor(data);
      case "weakness":
        return new Weakness(data);
      default:
        throw new Error(`No "${data.name}" Condition found`);
    }
  }
}
