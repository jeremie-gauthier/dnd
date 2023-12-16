import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AnalyticsModel } from 'src/database/models/analytics/analytics.model';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [DatabaseModule],
  providers: [AnalyticsModel, AnalyticsService],
})
export class AnalyticsModule {}
