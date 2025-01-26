import { PickType } from "@nestjs/swagger";
import { Game } from "../../infra/database/entities/game.entity";
import { PlayableEntity } from "../../infra/database/entities/playable-entity/playable-entity.entity";

export class GameView extends PickType(Game, [
  "id",
  "status",
  "board",
  "gameMaster",
  "playableEntities",
] as const) {
  readonly timeline: Array<PlayableEntity["id"]>;
}
