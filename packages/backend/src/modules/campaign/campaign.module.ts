import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CampaignProgression } from "src/modules/campaign/infra/database/entities/campaign-progression.entity";
import { CampaignStageProgression } from "src/modules/campaign/infra/database/entities/campaign-stage-progression.entity";
import { CampaignStage } from "src/modules/campaign/infra/database/entities/campaign-stage.entity";
import { Campaign } from "src/modules/campaign/infra/database/entities/campaign.entity";
import { GetHeroDetailsRepository } from "../game/application/use-cases/get-hero-details/get-hero-details.repository";
import { GetHeroDetailsUseCase } from "../game/application/use-cases/get-hero-details/get-hero-details.uc";
import { CoordService } from "./domain/coord/coord.service";
import { MapSerializerService } from "./domain/map-serializer/map-serializer.service";
import { CampaignListeners } from "./infra/controller/campaign.listeners";
import { CampaignPrivateController } from "./infra/controller/campaign.private-controller";
import { CreateCampaignForUserRepository } from "./use-cases/create-campaign-for-user/create-campaign-for-user.repository";
import { CreateCampaignForUserUseCase } from "./use-cases/create-campaign-for-user/create-campaign-for-user.uc";
import { GameInitializationRepository } from "./use-cases/game-initialization/game-initialization.repository";
import { GameInitializationUseCase } from "./use-cases/game-initialization/game-initialization.uc";
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
    TypeOrmModule.forFeature([
      Campaign,
      CampaignStage,
      CampaignProgression,
      CampaignStageProgression,
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
    GameInitializationUseCase,
    GameInitializationRepository,
    CoordService,
    MapSerializerService,
    GetHeroDetailsUseCase,
    GetHeroDetailsRepository,
  ],
})
export class CampaignModule {}
