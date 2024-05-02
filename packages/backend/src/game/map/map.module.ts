import { Module } from "@nestjs/common";
import { CoordService } from "./services/coord/coord.service";
import { MapSerializerService } from "./services/map-serializer/map-serializer.service";
import { MapService } from "./services/map/map.service";
import { VisibilityService } from "./services/visibility/visibility.service";

@Module({
  providers: [
    MapSerializerService,
    CoordService,
    VisibilityService,
    MapService,
  ],
  exports: [MapSerializerService, CoordService, VisibilityService, MapService],
})
export class MapModule {}
