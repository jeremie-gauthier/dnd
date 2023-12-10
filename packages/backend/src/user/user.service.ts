import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserModel } from './model/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userModel: UserModel) {}

  // TODO: create an event listener to get a campaign_template and push it into the array of user's campaigns
  @OnEvent('to-be-defined', { async: true })
  public handleCampaignAddToUser(data: unknown) {
    console.log('handleCampaignAddToUser event', data);
  }
}
