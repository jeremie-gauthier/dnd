import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CampaignProgression } from "src/database/entities/campaign-progression.entity";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { HeroTemplate } from "src/database/entities/hero-template.entity";
import { Hero } from "src/database/entities/hero.entity";
import { User } from "src/database/entities/user.entity";
import { AuthzModule } from "src/modules/authz/authz.module";
import { CampaignListeners } from "./infra/controller/campaign.listeners";
import { CampaignPrivateController } from "./infra/controller/campaign.private-controller";
import { CreateCampaignForUserRepository } from "./use-cases/create-campaign-for-user/create-campaign-for-user.repository";
import { CreateCampaignForUserUseCase } from "./use-cases/create-campaign-for-user/create-campaign-for-user.uc";
import { GetCampaignsRepository } from "./use-cases/get-campaigns/get-campaigns.repository";
import { GetCampaignsUseCase } from "./use-cases/get-campaigns/get-campaigns.uc";
import { InitializeNewUserRepository } from "./use-cases/initialize-new-user/initialize-new-user.repository";
import { InitializeNewUserUseCase } from "./use-cases/initialize-new-user/initialize-new-user.uc";
import { NewCampaignStartedRepository } from "./use-cases/new-campaign-started/new-campaign-started.repository";
import { NewCampaignStartedUseCase } from "./use-cases/new-campaign-started/new-campaign-started.uc";
import { RequestCreateLobbyRepository } from "./use-cases/request-create-lobby/request-create-lobby.repository";
import { RequestCreateLobbyUseCase } from "./use-cases/request-create-lobby/request-create-lobby.uc";

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
