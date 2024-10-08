import { Entity } from "src/modules/shared/domain/entity";
import { Playable } from "../../playable-entity.abstract";

type Data = {
  readonly name:
    | "stopped"
    | "brokenArmor"
    | "weakness"
    | "doubleMovementPoints"
    | "trapProtection"
    | "doubleWeaponDamage";
  readonly applicableAt:
    | "startOfTurn"
    | "endOfTurn"
    | "nextIncomingAttack"
    | "nextTrapOrChestTrap"
    | "nextOutgoingWeaponAttack";
  remainingTurns: number;
};

export abstract class Condition extends Entity<Data> {
  public abstract apply(_: { playableEntityAffected: Playable }): void;
  public abstract exhaustion(_: { playableEntityAffected: Playable }): void;

  public get name() {
    return this._data.name;
  }

  public get isApplicableAtStartOfTurn() {
    return this._data.applicableAt === "startOfTurn";
  }

  public get isApplicableAtEndOfTurn() {
    return this._data.applicableAt === "endOfTurn";
  }

  public get isApplicableAtNextIncomingAttack() {
    return this._data.applicableAt === "nextIncomingAttack";
  }

  public get isApplicableAtNextTrapOrChestTrap() {
    return this._data.applicableAt === "nextTrapOrChestTrap";
  }

  public get isApplicableAtNextOutgoingWeaponAttack() {
    return this._data.applicableAt === "nextOutgoingWeaponAttack";
  }

  public get isExhausted() {
    return this._data.remainingTurns <= 0;
  }

  public equals(other: Condition): boolean {
    return this._data.name === other._data.name;
  }

  public toPlain() {
    return {
      name: this._data.name,
      applicableAt: this._data.applicableAt,
      remainingTurns: this._data.remainingTurns,
    };
  }
}
