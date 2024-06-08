import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import type { NewUserCreatedPayload } from "src/modules/user/events/new-user-created.payload";
import { CampaignEvent } from "../../events/campaign-event.enum";
import { UnlockCampaignForUserPayload } from "../../events/unlock-campaign-for-user.payload";
import { InitializeNewUserRepository } from "./initialize-new-user.repository";

@Injectable()
export class InitializeNewUserUseCase implements UseCase {
  constructor(
    private readonly emitter: EventEmitter2,
    private readonly repository: InitializeNewUserRepository,
  ) {}

  public async execute({ userId }: NewUserCreatedPayload) {
    const campaignsForNewUsers =
      await this.repository.getAvailableCampaignsForNewUsers();

    await Promise.all(
      campaignsForNewUsers.map((campaign) =>
        this.emitter.emitAsync(
          CampaignEvent.UnlockCampaignForUser,
          new UnlockCampaignForUserPayload({
            userId,
            campaignId: campaign.id,
          }),
        ),
      ),
    );
  }
}
