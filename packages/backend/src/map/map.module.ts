import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MapTemplateModel } from 'src/database/models/map-template/map-template.model';
import { MapService } from './map.service';

@Module({
  imports: [DatabaseModule],
  providers: [MapTemplateModel, MapService],
})
export class MapModule {}
