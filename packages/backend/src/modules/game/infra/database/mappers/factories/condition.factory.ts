import { BrokenArmor } from "src/modules/game/domain/playable-entities/playable-entity/conditions/broken-armor.condition";
import { Condition as ConditionDomain } from "src/modules/game/domain/playable-entities/playable-entity/conditions/condition.entity";
import { DoubleMovementPoints } from "src/modules/game/domain/playable-entities/playable-entity/conditions/double-movement-points.condition";
import { DoubleWeaponDamage } from "src/modules/game/domain/playable-entities/playable-entity/conditions/double-weapon-damage.condition";
import { Stopped } from "src/modules/game/domain/playable-entities/playable-entity/conditions/stopped.condition";
import { TrapProtection } from "src/modules/game/domain/playable-entities/playable-entity/conditions/trap-protection.condition";
import { Weakness } from "src/modules/game/domain/playable-entities/playable-entity/conditions/weakness.condition";
import { Playable as PlayableDomain } from "src/modules/game/domain/playable-entities/playable-entity/playable-entity.abstract";
import { PlayableEntityCondition as PlayableEntityConditionPersistence } from "src/modules/game/infra/database/entities/playable-entity-condition.entity";

export class ConditionFactory {
  private constructor() {}

  public static create(
    data: PlayableEntityConditionPersistence & {
      playableEntityAffected: PlayableDomain;
    },
  ): ConditionDomain {
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
