import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { Playable } from "../playable-entity.abstract";
import { Condition } from "./condition/condition.abstract";

type Data = {
  values: Array<Condition>;
};

export class Conditions extends Entity<Data> {
  public add({ condition }: { condition: Condition }) {
    this._data.values.push(condition);
  }

  public applyAllStartTurnConditions({
    playableEntityAffected,
  }: { playableEntityAffected: Playable }) {
    const startOfTurnConditions = this._data.values.filter(
      (condition) => condition.isApplicableAtStartOfTurn,
    );
    for (const conditon of startOfTurnConditions) {
      conditon.apply({ playableEntityAffected });
    }

    this.clearExhausted();
  }

  public applyAllEndTurnConditions({
    playableEntityAffected,
  }: { playableEntityAffected: Playable }) {
    const endOfTurnConditions = this._data.values.filter(
      (condition) => condition.isApplicableAtEndOfTurn,
    );
    for (const conditon of endOfTurnConditions) {
      conditon.apply({ playableEntityAffected });
    }

    this.clearExhausted();
  }

  private clearExhausted() {
    this._data.values = this._data.values.filter((value) => !value.isExhausted);
  }

  public toPlain(): PlainData<Data> {
    return {
      values: this._data.values.map((value) => value.toPlain()),
    };
  }
}
