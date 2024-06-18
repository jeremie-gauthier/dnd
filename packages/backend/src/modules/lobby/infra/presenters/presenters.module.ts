import { Module } from "@nestjs/common";
import { ApplicationModule } from "../../application/application.module";
import { LobbyPrivateController } from "../presenters/http/lobby.private-controller";
import { LobbyPublisherGateway } from "../presenters/ws/lobby.publisher-gateway";
import { LobbySubscriberGateway } from "../presenters/ws/lobby.subscriber-gateway";

@Module({
  imports: [ApplicationModule],
  controllers: [LobbyPrivateController],
  providers: [LobbySubscriberGateway, LobbyPublisherGateway],
  exports: [],
})
export class PresentersModule {}
