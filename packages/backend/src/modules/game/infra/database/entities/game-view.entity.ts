import { PickType } from "@nestjs/swagger";
import { PlayableEntity } from "src/database/entities/playable-entity.entity";
import { Game } from "./game.entity";

export class GameView extends PickType(Game, [
  "id",
  "status",
  "board",
  "gameMaster",
  "playableEntities",
]) {
  readonly timeline: Array<PlayableEntity["id"]>;
}
