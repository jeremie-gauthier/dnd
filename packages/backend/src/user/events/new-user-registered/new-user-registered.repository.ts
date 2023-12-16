import { Injectable } from '@nestjs/common';
import { CampaignTemplateModel } from 'src/database/models/campaign-template/campaign-template.model';
import { EntityTemplateModel } from 'src/database/models/entity-template/entity-template.model';
import { UserModel } from 'src/database/models/user/user.model';
import { User } from 'src/database/models/user/user.type';

@Injectable()
export class NewUserRegisteredRepository {
  constructor(
    private readonly userModel: UserModel,
    private readonly campaignTemplateModel: CampaignTemplateModel,
    private readonly entityTemplateModel: EntityTemplateModel,
  ) {}

  public async createNewUser(userId: User['id']): Promise<void> {
    const [campaignTemplates = [], characterTemplates = []] = await Promise.all([
      this.campaignTemplateModel.exec(this.campaignTemplateModel.table),
      this.entityTemplateModel.exec(this.entityTemplateModel.table.filter({ type: 'character' })),
    ]);

    console.log(campaignTemplates, characterTemplates);

    // await this.userModel.exec(
    //   this.userModel.table.insert({
    //     id: userId,
    //     campaigns: campaignTemplates.map((campaignTemplate) => ({
    //       ...campaignTemplate,
    //       status: 'LOCKED',
    //       stages: (campaignTemplate.stages ?? []).map((stage) => ({
    //         ...stage,
    //         status: 'LOCKED',
    //       })),
    //       characters: characterTemplates as CharacterEntity[],
    //     })) as unknown as User['campaigns'],
    //   }),
    // );
  }
}
