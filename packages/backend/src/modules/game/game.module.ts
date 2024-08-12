import { Module } from "@nestjs/common";
import { DatabaseModule } from "../lobby/infra/database/database.module";
import { ApplicationModule } from "./application/application.module";
import { PresentersModule } from "./infra/presenters/presenters.module";

@Module({
  imports: [PresentersModule, DatabaseModule, ApplicationModule],
  controllers: [],
  providers: [],
})
export class GameModule {}
