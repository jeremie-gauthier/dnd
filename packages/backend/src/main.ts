import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env" });

import "multer";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { patchNestJsSwagger } from "nestjs-zod";
import { AppModule } from "./app.module";

patchNestJsSwagger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<string>("PORT");

  process.on("unhandledRejection", (reason: unknown) => {
    console.error("UnhandledRejection thrown. Reason:", reason);
  });

  app.enableShutdownHooks();

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("DnD")
    .setDescription("The DnD API description")
    .setVersion("1.0")
    .addServer(`http://localhost:${PORT}`)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(PORT, "0.0.0.0");
}

bootstrap().catch((err) => {
  console.error("Error at bootstrap:", err);
});
