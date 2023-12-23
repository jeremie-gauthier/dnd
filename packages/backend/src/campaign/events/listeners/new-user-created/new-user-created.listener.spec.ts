import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CampaignProgression } from 'src/database/entities/campaign-progression.entity';
import { CampaignStageProgression } from 'src/database/entities/campaign-stage-progression.entity';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User, UserStatus } from 'src/database/entities/user.entity';
import { NewUserCreatedPayload } from 'src/user/events/emitters/new-user-created.payload';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CampaignEvent } from '../../emitters/campaign-events.enum';
import { UserCampaignInitializedPayload } from '../../emitters/user-campaign-initialized.payload';
import { NewUserCreatedListener } from './new-user-created.listener';
import { NewUserCreatedRepository } from './new-user-created.repository';

describe('NewUserCreatedListener', () => {
  let newUserCreatedListener: NewUserCreatedListener;
  let eventEmitter2: EventEmitter2;

  const userId = 'user_id';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        NewUserCreatedListener,
        {
          provide: NewUserCreatedRepository,
          useValue: {
            getUserById: () => ({ id: userId, status: UserStatus.CREATED }),
            getAllCampaignsWithStages: () => [],
            createCampaignProgression: () => [],
            updateUser: () => ({
              id: userId,
              status: UserStatus.INITIALIZED,
              campaignProgressions: [],
            }),
          },
        },
        EventEmitter2,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Campaign),
          useValue: {},
        },
        {
          provide: getRepositoryToken(CampaignProgression),
          useValue: {},
        },
        {
          provide: getRepositoryToken(CampaignStageProgression),
          useValue: {},
        },
      ],
    }).compile();

    newUserCreatedListener = app.get<NewUserCreatedListener>(NewUserCreatedListener);
    eventEmitter2 = app.get<EventEmitter2>(EventEmitter2);
  });

  it('should initialize a new user', async () => {
    const eventEmitter = vi.spyOn(eventEmitter2, 'emitAsync');

    const eventPayload = new NewUserCreatedPayload({ userId });
    await newUserCreatedListener.handler(eventPayload);

    expect(eventEmitter).toHaveBeenCalledOnce();
    expect(eventEmitter).toBeCalledWith(
      CampaignEvent.UserCampaignsInitialized,
      new UserCampaignInitializedPayload({ userId }),
    );
  });
});
