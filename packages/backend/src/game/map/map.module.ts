import { Module } from '@nestjs/common';
import { MapSerializerService } from './map-serializer/map-serializer.service';

@Module({
  providers: [MapSerializerService],
})
export class MapModule {}
