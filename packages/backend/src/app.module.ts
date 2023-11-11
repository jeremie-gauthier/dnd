import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envConfig, { validationSchema } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      validationSchema,
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
