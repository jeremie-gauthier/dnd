import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { HeroTemplate } from "src/database/entities/hero-template.entity";
import { Hero } from "src/database/entities/hero.entity";
import { User } from "src/database/entities/user.entity";
import { AuthzModule } from "src/modules/authz/authz.module";
import { CampaignListeners } from "./campaign.listeners";
import { CampaignPrivateController } from "./campaign.private-controller";
import { CreateCampaignForUserRepository } from "./create-campaign-for-user/create-campaign-for-user.repository";
import { CreateCampaignForUserUseCase } from "./create-campaign-for-user/create-campaign-for-user.uc";
import { GetCampaignsRepository } from "./get-campaigns/get-campaigns.repository";
import { GetCampaignsUseCase } from "./get-campaigns/get-campaigns.uc";
import { InitializeNewUserRepository } from "./initialize-new-user/initialize-new-user.repository";
import { InitializeNewUserUseCase } from "./initialize-new-user/initialize-new-user.uc";
import { NewCampaignStartedRepository } from "./new-campaign-started/new-campaign-started.repository";
import { NewCampaignStartedUseCase } from "./new-campaign-started/new-campaign-started.uc";
import { RequestCreateLobbyRepository } from "./request-create-lobby/request-create-lobby.repository";
import { RequestCreateLobbyUseCase } from "./request-create-lobby/request-create-lobby.uc";

@Module({
  imports: [
    AuthzModule,
    TypeOrmModule.forFeature([
      Hero,
      HeroTemplate,
      User,
      Campaign,
      CampaignStage,
      CampaignProgression,
    ]),
  ],
  controllers: [CampaignPrivateController],
  providers: [
    CampaignListeners,
    NewCampaignStartedUseCase,
    NewCampaignStartedRepository,
    GetCampaignsUseCase,
    GetCampaignsRepository,
    InitializeNewUserUseCase,
    InitializeNewUserRepository,
    CreateCampaignForUserUseCase,
    CreateCampaignForUserRepository,
    RequestCreateLobbyUseCase,
    RequestCreateLobbyRepository,
  ],
})
export class CampaignModule {}
