import { discardHeroInputSchema, discardHeroOutputSchema } from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class DiscardHeroInputDto extends createZodDto(discardHeroInputSchema) {}

export class DiscardHeroOutputDto extends createZodDto(
  discardHeroOutputSchema,
) {}
