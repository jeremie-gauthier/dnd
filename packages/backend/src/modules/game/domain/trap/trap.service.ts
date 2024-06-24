import { GameEntity, PlayableEntity } from "@dnd/shared";
import { TrapEntity } from "@dnd/shared/dist/database/game/interactive-entities.type";
import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { TrapTriggeredPayload } from "src/modules/shared/events/game/trap-triggered.payload";
import { CombatService } from "../combat/combat.service";

interface TrapTriggerParams {
  game: GameEntity;
  trapEntity: TrapEntity;
  subjectEntity: PlayableEntity;
}

@Injectable()
export class TrapService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly combatService: CombatService,
  ) {}

  private readonly trapsByType: Readonly<
    Record<TrapEntity["name"], (payload: TrapTriggerParams) => void>
  > = {
    pit: this.pitTrapTrigger.bind(this),
  };

  public trigger({ game, trapEntity, subjectEntity }: TrapTriggerParams): void {
    const trapTrigger = this.trapsByType[trapEntity.name];
    if (!trapTrigger) {
      throw new NotFoundException("Trap not found");
    }

    trapEntity.canInteract = false;
    trapEntity.isVisible = true;

    this.eventEmitter.emitAsync(
      GameEvent.TrapTriggered,
      new TrapTriggeredPayload({ game, trapEntity, subjectEntity }),
    );

    trapTrigger({ game, trapEntity, subjectEntity });
  }

  private pitTrapTrigger({ game, subjectEntity }: TrapTriggerParams): void {
    const PIT_TRAP_DAMAGE = 1;
    this.combatService.takeDamage({
      game,
      target: subjectEntity,
      amount: PIT_TRAP_DAMAGE,
    });
  }
}
