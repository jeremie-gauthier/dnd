import { IsNotEmpty, IsString } from "class-validator";
import { PlayableEntity } from "src/modules/game/infra/database/entities/playable-entity/playable-entity.entity";
import { GameView } from "../../dtos/game-view.dto";
export class GetUserGameStateInputParamsDto {
  @IsString()
  @IsNotEmpty()
  readonly gameId: string;
}

class PlayerCurrentlyPlayingDto {
  readonly userId: string;
  readonly entityId: PlayableEntity["id"];
}

export class GetUserGameStateOutputDto {
  readonly game: GameView;
  readonly yourStatus: "preparation" | "idle" | "action";
  readonly playerCurrentlyPlaying: PlayerCurrentlyPlayingDto;
}
