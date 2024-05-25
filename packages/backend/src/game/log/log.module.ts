import { Module } from "@nestjs/common";
import { LogPublisherGateway } from "./log.publisher-gateway";
import { LogService } from "./services/log/log.service";

@Module({
  providers: [LogService, LogPublisherGateway],
})
export class LogModule {}
