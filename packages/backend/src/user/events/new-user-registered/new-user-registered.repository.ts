import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/database/entities/campaign.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewUserRegisteredRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  public async createNewUser(userId: User['id']): Promise<void> {
    const [campaignTemplates = [], characterTemplates = []] = await Promise.all([
      // this.campaignTemplateModel.exec(this.campaignTemplateModel.table),
      this.campaignRepository.find(),
      // this.entityTemplateModel.exec(this.entityTemplateModel.table.filter({ type: 'character' })),
    ]);

    console.log(userId, campaignTemplates, characterTemplates);

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
