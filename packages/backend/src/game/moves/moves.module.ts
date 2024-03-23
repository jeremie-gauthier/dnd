import { Module } from "@nestjs/common";
import { MovesService } from "./moves.service";

@Module({
  exports: [MovesService],
  providers: [MovesService],
})
export class MovesModule {}
