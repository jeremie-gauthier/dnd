import { BrokenArmor } from "../../domain/playable-entities/playable-entity/conditions/condition/broken-armor.condition";
import { Condition } from "../../domain/playable-entities/playable-entity/conditions/condition/condition.abstract";
import { DoubleMovementPoints } from "../../domain/playable-entities/playable-entity/conditions/condition/double-movement-points.condition";
import { DoubleWeaponDamage } from "../../domain/playable-entities/playable-entity/conditions/condition/double-weapon-damage.condition";
import { Stopped } from "../../domain/playable-entities/playable-entity/conditions/condition/stopped.condition";
import { TrapProtection } from "../../domain/playable-entities/playable-entity/conditions/condition/trap-protection.condition";
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
      case "doubleMovementPoints":
        return new DoubleMovementPoints(data);
      case "trapProtection":
        return new TrapProtection(data);
      case "doubleWeaponDamage":
        return new DoubleWeaponDamage(data);
      default:
        throw new Error(`No "${data.name}" Condition found`);
    }
  }
}
