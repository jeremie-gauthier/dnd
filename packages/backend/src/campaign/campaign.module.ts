import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthzModule } from "src/authz/authz.module";
import { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { HeroTemplate } from "src/database/entities/hero-template.entity";
import { User } from "src/database/entities/user.entity";
import { CampaignPrivateController } from "./campaign.private-controller";
import { CreateCampaignForUserListener } from "./events/listeners/create-campaign-for-user/create-campaign-for-user.listener";
import { CreateCampaignForUserRepository } from "./events/listeners/create-campaign-for-user/create-campaign-for-user.repository";
import { InitializeNewUserListener } from "./events/listeners/initialize-new-user/initialize-new-user.listener";
import { InitializeNewUserRepository } from "./events/listeners/initialize-new-user/initialize-new-user.repository";
import { GetCampaignsRepository } from "./get-campaigns/get-campaigns.repository";
import { GetCampaignsUseCase } from "./get-campaigns/get-campaigns.uc";
import { NewCampaignStartedRepository } from "./new-campaign-started/new-campaign-started.repository";
import { NewCampaignStartedUseCase } from "./new-campaign-started/new-campaign-started.uc";

@Module({
  imports: [
    AuthzModule,
    TypeOrmModule.forFeature([
      HeroTemplate,
      User,
      Campaign,
      CampaignStage,
      CampaignProgression,
    ]),
  ],
  controllers: [CampaignPrivateController],
  providers: [
    NewCampaignStartedUseCase,
    NewCampaignStartedRepository,
    GetCampaignsUseCase,
    GetCampaignsRepository,
    InitializeNewUserListener,
    InitializeNewUserRepository,
    CreateCampaignForUserListener,
    CreateCampaignForUserRepository,
  ],
})
export class CampaignModule {}
