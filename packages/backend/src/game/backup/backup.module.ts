import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { BackupRepository } from "./services/backup/backup.repository";
import { BackupService } from "./services/backup/backup.service";

@Module({
  imports: [RedisModule],
  providers: [BackupService, BackupRepository],
  exports: [BackupService],
})
export class BackupModule {}
