import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Playable } from "../playable-entity.abstract";
import { ConditionLifecycleObserver } from "./interfaces/condition-lifecycle-observer.interface";

type Data = {
  readonly name:
    | "stopped"
    | "brokenArmor"
    | "weakness"
    | "doubleMovementPoints"
    | "trapProtection"
    | "doubleWeaponDamage";
  readonly playableEntityAffected: Playable;
  remainingTurns: number;
};

export class Condition
  extends Entity<Data>
  implements ConditionLifecycleObserver
{
  protected static baseSchema = z.object({
    playableEntityAffected: z.instanceof(Playable),
    remainingTurns: z.number().min(0),
  });

  public onStartOfTurn(): void {}
  public onEndOfTurn(): void {}
  public onBeforeOutgoingWeaponAttack(_: { sumResult: number }): void {}
  public onBeforeTrapOrChestTrapTriggered(): void {}
  public onBeforeIncomingAttack(): void {}
  protected onExhaustion(): void {}

  public get name() {
    return this._data.name;
  }

  public get isExhausted() {
    return this._data.remainingTurns <= 0;
  }

  protected decrementRemainingTurns() {
    this._data.remainingTurns -= 1;
    if (this.isExhausted) {
      this.onExhaustion();
      this._data.playableEntityAffected.removeCondition(this);
    }
  }

  public isTrapProtection(): boolean {
    return this.name === "trapProtection";
  }

  public toPlain() {
    return {
      name: this._data.name,
      remainingTurns: this._data.remainingTurns,
      // Empty object to avoid circular ref. We don't need to plain this object at this level anyway
      playableEntityAffected: {} as ReturnType<Playable["toPlain"]>,
    };
  }
}
