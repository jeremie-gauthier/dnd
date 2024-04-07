import { Module } from "@nestjs/common";
import { MapSerializerService } from "./services/map-serializer/map-serializer.service";
import { CoordService } from './services/coord/coord.service';

@Module({
  providers: [MapSerializerService, CoordService],
  exports: [MapSerializerService],
})
export class MapModule {}
