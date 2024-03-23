import { Module } from "@nestjs/common";
import { GameChangedListener } from "./events/listeners/game-changed/game-changed.listener";
import { GameChangedRepository } from "./events/listeners/game-changed/game-changed.repository";
import { GameInitializationListener } from "./events/listeners/game-initialization/game-initialization.listener";
import { GameInitializationRepository } from "./events/listeners/game-initialization/game-initialization.repository";
import { GamePreparationPhaseListener } from "./events/listeners/game-preparation-phase/game-preparation-phase.listener";
import { GamePreparationPhaseRepository } from "./events/listeners/game-preparation-phase/game-preparation-phase.repository";
import { MapModule } from "./map/map.module";
import { StartingModule } from "./starting/starting.module";

@Module({
  imports: [MapModule, StartingModule],
  providers: [
    GameChangedListener,
    GameChangedRepository,
    GameInitializationListener,
    GameInitializationRepository,
    GamePreparationPhaseListener,
    GamePreparationPhaseRepository,
  ],
})
export class GameModule {}
