import { Condition } from "../../domain/playable-entities/playable-entity/conditions/condition/condition.abstract";
import { Stopped } from "../../domain/playable-entities/playable-entity/conditions/condition/stopped.condition";
import { PlayableEntityCondition } from "../../infra/database/game/model/playable-entity/condition.type";

export class ConditionFactory {
  private constructor() {}

  public static create(data: PlayableEntityCondition): Condition {
    switch (data.name) {
      case "stopped":
        return new Stopped(data);
      default:
        throw new Error(`No "${data.name}" Condition found`);
    }
  }
}
