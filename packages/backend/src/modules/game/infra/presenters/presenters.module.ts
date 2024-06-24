import { Module } from "@nestjs/common";
import { ApplicationModule } from "../../application/application.module";
import { GamePrivateController } from "./http/game.private-controller";
import { GamePublisherGateway } from "./ws/game.publisher-gateway";
import { GameSubscriberGateway } from "./ws/game.subscriber-gateway";

@Module({
  imports: [ApplicationModule],
  controllers: [GamePrivateController],
  providers: [GameSubscriberGateway, GamePublisherGateway],
  exports: [],
})
export class PresentersModule {}
