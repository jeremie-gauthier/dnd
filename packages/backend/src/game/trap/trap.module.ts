import { Module } from "@nestjs/common";
import { TrapService } from "./services/trap.service";

@Module({
  exports: [TrapService],
  providers: [TrapService],
})
export class TrapModule {}
