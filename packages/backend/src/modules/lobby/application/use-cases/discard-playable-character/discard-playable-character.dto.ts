import {
  discardPlayableCharacterInputSchema,
  discardPlayableCharacterOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class DiscardPlayableCharacterInputDto extends createZodDto(
  discardPlayableCharacterInputSchema,
) {}

export class DiscardPlayableCharacterOutputDto extends createZodDto(
  discardPlayableCharacterOutputSchema,
) {}
