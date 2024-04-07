import { Module } from "@nestjs/common";
import { MovesService } from "./services/moves.service";

@Module({
  exports: [MovesService],
  providers: [MovesService],
})
export class MovesModule {}
