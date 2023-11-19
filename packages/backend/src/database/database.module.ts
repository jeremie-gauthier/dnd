import { Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  providers: [DatabaseProvider, DatabaseService],
  exports: [DatabaseProvider, DatabaseService],
})
export class DatabaseModule {}
