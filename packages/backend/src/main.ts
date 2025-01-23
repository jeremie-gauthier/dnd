import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env" });

import "multer";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.on("unhandledRejection", (reason: unknown) => {
    console.error("UnhandledRejection thrown. Reason:", reason);
  });

  app.enableShutdownHooks();

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("DnD")
    .setDescription("The DnD API description")
    .setVersion("1.0")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<string>("PORT");
  await app.listen(PORT, "0.0.0.0");
}

bootstrap().catch((err) => {
  console.error("Error at bootstrap:", err);
});
