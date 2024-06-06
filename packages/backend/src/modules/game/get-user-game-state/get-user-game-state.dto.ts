import {
  getUserGameStateInputSchema,
  getUserGameStateOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class GetUserGameStateInputDto extends createZodDto(
  getUserGameStateInputSchema,
) {}

export class GetUserGameStateOutputDto extends createZodDto(
  getUserGameStateOutputSchema,
) {}
