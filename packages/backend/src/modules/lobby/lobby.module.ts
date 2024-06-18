import { Module } from "@nestjs/common";
import { ApplicationModule } from "./application/application.module";
import { DatabaseModule } from "./infra/database/database.module";
import { PresentersModule } from "./infra/presenters/presenters.module";

@Module({
  imports: [PresentersModule, DatabaseModule, ApplicationModule],
})
export class LobbyModule {}
