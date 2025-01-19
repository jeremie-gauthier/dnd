import { z } from "zod";
import { TrapTriggeredDomainEvent } from "../../../domain-events/dtos/trap-triggered.dto";
import { Playable } from "../../../playable-entities/playable-entity/playable-entity.abstract";
import { TileInteractiveEntity } from "./interactive.abstract";

type Data = {
  readonly name: "pit";
  readonly type: "interactive-entity";
  readonly kind: "trap";
  isBlocking: boolean;
  isVisible: boolean;
  canInteract: boolean;
};

export class Trap extends TileInteractiveEntity<Data> {
  private static schema = z.object({
    type: z.literal("interactive-entity").default("interactive-entity"),
    kind: z.literal("trap").default("trap"),
    name: z.literal("pit").default("pit"),
    isBlocking: z.boolean(),
    isVisible: z.boolean(),
    canInteract: z.boolean(),
  });

  constructor(rawData: Omit<Data, "type" | "kind" | "pit">) {
    const data = Trap.schema.parse(rawData);
    super(data);
  }

  get canInteract(): boolean {
    return this._data.canInteract;
  }

  public override onInteraction({
    playableEntity,
  }: { playableEntity: Playable }): void {
    this.mustBeInteractive();

    this._data.isBlocking = false;
    this._data.canInteract = false;
    this._data.isVisible = true;

    this.addDomainEvent(
      new TrapTriggeredDomainEvent({
        trapEntity: this.toPlain(),
        subjectEntity: playableEntity.toPlain(),
      }),
    );

    if (
      playableEntity.conditions.some((condition) =>
        condition.isTrapProtection(),
      )
    ) {
      for (const condition of playableEntity.conditions) {
        condition.onBeforeTrapOrChestTrapTriggered();
      }
    } else {
      playableEntity.takeDirectDamage({ amount: 1 });
      playableEntity.addDomainEvents(playableEntity.collectDomainEvents());
    }
  }

  public override toPlain() {
    return {
      canInteract: this._data.canInteract,
      isBlocking: this._data.isBlocking,
      isVisible: this._data.isVisible,
      name: this._data.name,
      type: this._data.type,
      kind: this._data.kind,
    };
  }
}
