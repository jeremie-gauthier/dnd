import { Module } from "@nestjs/common";
import { ApplicationModule } from "../../application/application.module";
import { DatabaseModule } from "../database/database.module";
import { GameDevController } from "./http/game.dev-controller";
import { GamePrivateController } from "./http/game.private-controller";
import { GamePresenter } from "./services/game.presenter";
import { HeroPresenter } from "./services/hero.presenter";
import { ItemPresenter } from "./services/item.presenter";
import { LogPresenter } from "./services/log.presenter";
import { GamePublisherGateway } from "./ws/game.publisher-gateway";
import { GameSubscriberGateway } from "./ws/game.subscriber-gateway";

@Module({
  imports: [ApplicationModule, DatabaseModule],
  controllers: [GamePrivateController, GameDevController],
  providers: [
    GameSubscriberGateway,
    GamePublisherGateway,
    GamePresenter,
    LogPresenter,
    ItemPresenter,
    HeroPresenter,
  ],
  exports: [],
})
export class PresentersModule {}
