import {
  getTranslationInputSchema,
  getTranslationOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class GetTranslationInputDto extends createZodDto(
  getTranslationInputSchema,
) {}

export class GetTranslationOutputDto extends createZodDto(
  getTranslationOutputSchema,
) {}
