import {
  endPlayerTurnInputSchema,
  endPlayerTurnOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class EndPlayerTurnInputDto extends createZodDto(
  endPlayerTurnInputSchema,
) {}

export class EndPlayerTurnOutputDto extends createZodDto(
  endPlayerTurnOutputSchema,
) {}
