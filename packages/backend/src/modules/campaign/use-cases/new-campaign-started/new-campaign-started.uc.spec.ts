import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, type TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { User } from "src/database/entities/user.entity";
import { UserStatus } from "src/database/enums/user-status.enum";
import { CampaignEvent } from "src/modules/campaign/events/campaign-event.enum";
import { NewCampaignStartedPayload } from "src/modules/campaign/events/new-campaign-started.payload";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewCampaignStartedRepository } from "./new-campaign-started.repository";
import { NewCampaignStartedUseCase } from "./new-campaign-started.uc";

describe("NewCampaignStartedUseCase", () => {
  let newCampaignStartedUseCase: NewCampaignStartedUseCase;
  let eventEmitter2: EventEmitter2;

  const userId = "user_id";
  const campaignProgressionId = "new_campaign_progression_id";

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        NewCampaignStartedUseCase,
        {
          provide: NewCampaignStartedRepository,
          useValue: {
            getUserById: () => ({ id: userId, status: UserStatus.CREATED }),
            getCampaignWithFirstStageById: () => ({
              stages: [],
            }),
            createCampaignProgressionForUser: () => ({
              id: campaignProgressionId,
            }),
          },
        },
        EventEmitter2,
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: getRepositoryToken(Campaign), useValue: {} },
        { provide: getRepositoryToken(CampaignProgression), useValue: {} },
      ],
    }).compile();

    newCampaignStartedUseCase = app.get<NewCampaignStartedUseCase>(
      NewCampaignStartedUseCase,
    );
    eventEmitter2 = app.get<EventEmitter2>(EventEmitter2);
  });

  it("should create a new campaign progression for the user", async () => {
    const campaignId = "campaign_1";
    const expected = { id: campaignProgressionId };

    const eventEmitter = vi.spyOn(eventEmitter2, "emitAsync");

    const result = await newCampaignStartedUseCase.execute({
      userId,
      campaignId,
    });

    expect(eventEmitter).toHaveBeenCalledOnce();
    expect(eventEmitter).toBeCalledWith(
      CampaignEvent.NewCampaignStarted,
      new NewCampaignStartedPayload({
        userId,
        campaignId,
        campaignProgressionId,
      }),
    );
    expect(result).toEqual(expected);
  });
});
