import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { RequestCreateLobbyPayload } from "src/modules/shared/events/lobby/request-create-lobby.payload";
import { CampaignEvent } from "../../events/campaign-event.enum";
import { RequestCreateLobbyFulfilledPayload } from "../../events/request-create-lobby-fulfilled.payload";
import { RequestCreateLobbyRepository } from "./request-create-lobby.repository";

@Injectable()
export class RequestCreateLobbyUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: RequestCreateLobbyRepository,
  ) {}

  public async execute({
    config,
    stageId,
    userId,
  }: RequestCreateLobbyPayload): Promise<void> {
    const [campaign, heroes] = await Promise.all([
      this.repository.getCampaign({ stageId }),
      this.repository.getHeroes({ stageId, userId }),
    ]);

    const selectedStage = this.getStageOrThrow({
      stages: campaign.stages,
      stageId,
    });

    this.eventEmitter.emitAsync(
      CampaignEvent.RequestCreateLobbyFulfilled,
      new RequestCreateLobbyFulfilledPayload({
        campaign,
        config,
        heroes,
        selectedStage,
        userId,
      }),
    );
  }

  private getStageOrThrow({
    stages,
    stageId,
  }: { stages: CampaignStage[]; stageId: CampaignStage["id"] }): CampaignStage {
    const stage = stages.find(({ id }) => id === stageId);
    if (!stage) {
      throw new NotFoundException("Campaign stage not found");
    }
    return stage;
  }
}
