import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import { HostRequestedGameStartPayload } from "src/modules/shared/events/lobby/host-requested-game-start.payload";
import { CampaignEvent } from "../../events/campaign-event.enum";
import { GameInitializationDonePayload } from "../../events/game-initialization-done.payload";
import { GameInitializationRepository } from "./game-initialization.repository";

@Injectable()
export class GameInitializationUseCase implements UseCase {
  constructor(
    private readonly repository: GameInitializationRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    lobby,
  }: HostRequestedGameStartPayload): Promise<void> {
    const campaignStageProgression =
      await this.repository.getUserCampaignStageProgression({
        campaignStageId: lobby.config.campaign.stage.id,
        userId: lobby.host.userId,
      });

    this.eventEmitter.emitAsync(
      CampaignEvent.GameInitializationDone,
      new GameInitializationDonePayload({
        campaignStageProgression,
        lobby,
      }),
    );
  }
}
