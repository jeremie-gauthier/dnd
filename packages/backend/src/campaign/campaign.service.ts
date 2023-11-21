import { Injectable } from '@nestjs/common';
import { CampaignModel } from './model/campaign.model';
import { CampaignSchema, campaignSchema } from './schema/campaign.schema';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignModel: CampaignModel) {}

  public async create() {
    const campaign: CampaignSchema = {
      title: 'First Campaign',
      stages: [
        {
          intro: 'Hello world!',
          outro: 'Goodbye world!',
        },
      ],
    };

    const validatedCampaign = await campaignSchema.parseAsync(campaign);
    console.log(validatedCampaign);

    const dbResult = await this.campaignModel.getAll();

    // const dbResult = await this.dbService.exec(
    //   this.dbService.db.table('campaign').insert(validatedCampaign),
    // );
    console.log(dbResult);
  }
}
