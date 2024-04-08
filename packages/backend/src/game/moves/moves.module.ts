import { Module } from "@nestjs/common";
import { MapModule } from "../map/map.module";
import { MovesService } from "./services/moves.service";

@Module({
  imports: [MapModule],
  exports: [MovesService],
  providers: [MovesService],
})
export class MovesModule {}
