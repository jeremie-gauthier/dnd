import { Module } from "@nestjs/common";
import { GameChangedListener } from "./events/listeners/game-changed/game-changed.listener";
import { GameChangedRepository } from "./events/listeners/game-changed/game-changed.repository";
import { GameInitializationListener } from "./events/listeners/game-initialization/game-initialization.listener";
import { GameInitializationRepository } from "./events/listeners/game-initialization/game-initialization.repository";
import { MapModule } from "./map/map.module";
import { StartingModule } from "./starting/starting.module";

@Module({
  imports: [MapModule, StartingModule],
  providers: [
    GameChangedListener,
    GameChangedRepository,
    GameInitializationListener,
    GameInitializationRepository,
  ],
})
export class GameModule {}
