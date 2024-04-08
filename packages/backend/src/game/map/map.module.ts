import { Module } from "@nestjs/common";
import { CoordService } from "./services/coord/coord.service";
import { MapSerializerService } from "./services/map-serializer/map-serializer.service";

@Module({
  providers: [MapSerializerService, CoordService],
  exports: [MapSerializerService, CoordService],
})
export class MapModule {}
