import { BrokenArmor } from "../../domain/playable-entities/playable-entity/conditions/broken-armor.condition";
import { Condition } from "../../domain/playable-entities/playable-entity/conditions/condition.entity";
import { DoubleMovementPoints } from "../../domain/playable-entities/playable-entity/conditions/double-movement-points.condition";
import { DoubleWeaponDamage } from "../../domain/playable-entities/playable-entity/conditions/double-weapon-damage.condition";
import { Stopped } from "../../domain/playable-entities/playable-entity/conditions/stopped.condition";
import { TrapProtection } from "../../domain/playable-entities/playable-entity/conditions/trap-protection.condition";
import { Weakness } from "../../domain/playable-entities/playable-entity/conditions/weakness.condition";
import { Playable } from "../../domain/playable-entities/playable-entity/playable-entity.abstract";
import { PlayableEntityCondition } from "../../infra/database/game/model/playable-entity/condition.type";

export class ConditionFactory {
  private constructor() {}

  public static create(
    data: PlayableEntityCondition & {
      playableEntityAffected: Playable;
    },
  ): Condition {
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
