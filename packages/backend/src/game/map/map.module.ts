import { Module } from "@nestjs/common";
import { CoordService } from "./services/coord/coord.service";
import { MapSerializerService } from "./services/map-serializer/map-serializer.service";
import { VisibilityService } from "./services/visibility/visibility.service";

@Module({
  providers: [MapSerializerService, CoordService, VisibilityService],
  exports: [MapSerializerService, CoordService, VisibilityService],
})
export class MapModule {}
