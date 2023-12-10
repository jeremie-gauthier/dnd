import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MapService } from './map.service';
import { MapTemplateModel } from './model/map-template.model';

@Module({
  imports: [DatabaseModule],
  providers: [MapTemplateModel, MapService],
  exports: [MapService],
})
export class MapModule {}
