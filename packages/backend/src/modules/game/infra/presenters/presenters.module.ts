import { Module } from "@nestjs/common";
import { ApplicationModule } from "../../application/application.module";
import { DatabaseModule } from "../database/database.module";
import { GamePrivateController } from "./http/game.private-controller";
import { GamePresenter } from "./services/game.presenter";
import { LogPresenter } from "./services/log.presenter";
import { GamePublisherGateway } from "./ws/game.publisher-gateway";
import { GameSubscriberGateway } from "./ws/game.subscriber-gateway";

@Module({
  imports: [ApplicationModule, DatabaseModule],
  controllers: [GamePrivateController],
  providers: [
    GameSubscriberGateway,
    GamePublisherGateway,
    GamePresenter,
    LogPresenter,
  ],
  exports: [],
})
export class PresentersModule {}
