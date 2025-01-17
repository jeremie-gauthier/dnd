import {
  endPlayerTurnInputSchema,
  endPlayerTurnOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PlayableEntityEndTurnInputDto extends createZodDto(
  endPlayerTurnInputSchema,
) {}

export class PlayableEntityEndTurnOutputDto extends createZodDto(
  endPlayerTurnOutputSchema,
) {}
