import { Module } from "@nestjs/common";
import { MapSerializerService } from "./map-serializer/map-serializer.service";

@Module({
  providers: [MapSerializerService],
  exports: [MapSerializerService],
})
export class MapModule {}
