import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CampaignEvent } from 'src/campaign/events/emitters/campaign-events.enum';
import { NewCampaignStartedPayload } from 'src/campaign/events/emitters/new-campaign-started.payload';
import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User, UserStatus } from 'src/database/entities/user.entity';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NewCampaignStartedRepository } from './new-campaign-started.repository';
import { NewCampaignStartedUseCase } from './new-campaign-started.uc';

describe('NewCampaignStartedUseCase', () => {
  let newCampaignStartedUseCase: NewCampaignStartedUseCase;
  let eventEmitter2: EventEmitter2;

  const userId = 'user_id';
  const campaignProgressionId = 'new_campaign_progression_id';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        NewCampaignStartedUseCase,
        {
          provide: NewCampaignStartedRepository,
          useValue: {
            getUserById: () => ({ id: userId, status: UserStatus.CREATED }),
            getCampaignWithFirstStageById: () => [],
            createCampaignProgressionForUser: () => ({ id: campaignProgressionId }),
          },
        },
        EventEmitter2,
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: getRepositoryToken(Campaign), useValue: {} },
        { provide: getRepositoryToken(CampaignProgression), useValue: {} },
      ],
    }).compile();

    newCampaignStartedUseCase = app.get<NewCampaignStartedUseCase>(NewCampaignStartedUseCase);
    eventEmitter2 = app.get<EventEmitter2>(EventEmitter2);
  });

  it('should create a new campaign progression for the user', async () => {
    const campaignId = 'campaign_1';
    const expected = { id: campaignProgressionId };

    const eventEmitter = vi.spyOn(eventEmitter2, 'emitAsync');

    const result = await newCampaignStartedUseCase.execute({ userId, campaignId });

    expect(eventEmitter).toHaveBeenCalledOnce();
    expect(eventEmitter).toBeCalledWith(
      CampaignEvent.NewCampaignStarted,
      new NewCampaignStartedPayload({ userId, campaignId, campaignProgressionId }),
    );
    expect(result).toEqual(expected);
  });
});
