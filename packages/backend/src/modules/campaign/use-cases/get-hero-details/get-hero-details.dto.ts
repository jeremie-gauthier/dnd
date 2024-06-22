import {
  getHeroDetailsInputSchema,
  getHeroDetailsOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class GetHeroDetailsInputDto extends createZodDto(
  getHeroDetailsInputSchema,
) {}

export class GetHeroDetailsOutputDto extends createZodDto(
  getHeroDetailsOutputSchema,
) {}
