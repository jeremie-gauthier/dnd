import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AnalyticsService } from './analytics.service';
import { AnalyticsModel } from './model/analytics.model';

@Module({
  imports: [DatabaseModule],
  providers: [AnalyticsModel, AnalyticsService],
})
export class AnalyticsModule {}
