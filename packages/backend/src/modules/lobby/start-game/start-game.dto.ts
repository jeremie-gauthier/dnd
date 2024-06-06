import { startGameInputSchema, startGameOutputSchema } from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class StartGameInputDto extends createZodDto(startGameInputSchema) {}

export class StartGameOutputDto extends createZodDto(startGameOutputSchema) {}
