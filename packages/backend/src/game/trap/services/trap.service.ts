import { Injectable, NotFoundException } from "@nestjs/common";
import { pitTrapTrigger } from "../collection/pit.trap";
import { TrapTrigger } from "../collection/trap.interface";

@Injectable()
export class TrapService {
  private static trapsByType = {
    trap: pitTrapTrigger,
  };

  public trigger({
    game,
    trapEntity,
    subjectEntity,
  }: Parameters<TrapTrigger>[0]): void {
    const trapTrigger = TrapService.trapsByType[trapEntity.kind as "trap"];
    if (!trapTrigger) {
      throw new NotFoundException("Trap not found");
    }

    trapTrigger({ game, trapEntity, subjectEntity });
  }
}
