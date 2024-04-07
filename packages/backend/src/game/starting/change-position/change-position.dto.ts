import {
  changePositionInputSchema,
  changePositionOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class ChangePositionInputDto extends createZodDto(
  changePositionInputSchema,
) {}

export class ChangePositionOutputDto extends createZodDto(
  changePositionOutputSchema,
) {}
