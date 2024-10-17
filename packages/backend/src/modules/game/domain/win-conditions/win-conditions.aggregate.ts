import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { GameWonDomainEvent } from "../domain-events/dtos/game-won.dto";
import { WinCondition } from "./win-condition/win-condition.abstract";
import { WinConditionEvent } from "./win-conditions.event";

type Data = {
  values: Array<WinCondition>;
};

export class WinConditions extends Entity<Data> {
  private static schema = z.object({
    values: z.array(z.instanceof(WinCondition)).min(1),
  });

  constructor(rawData: Data) {
    const data = WinConditions.schema.parse(rawData);
    super(data);
  }

  public toPlain() {
    return {
      values: this._data.values.map((winCondition) => winCondition.toPlain()),
    };
  }

  public updateWinConditions(eventData: {
    eventName: WinConditionEvent;
  }): void {
    for (const winCondition of this._data.values) {
      winCondition.updateProgression(eventData);
    }

    if (this.areWin()) {
      this.addDomainEvent(new GameWonDomainEvent());
    }
  }

  public areWin() {
    return this._data.values.every(
      (winCondition) => winCondition.isAccomplished,
    );
  }
}
