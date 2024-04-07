import { pickHeroInputSchema, pickHeroOutputSchema } from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PickHeroInputDto extends createZodDto(pickHeroInputSchema) {}

export class PickHeroOutputDto extends createZodDto(pickHeroOutputSchema) {}
