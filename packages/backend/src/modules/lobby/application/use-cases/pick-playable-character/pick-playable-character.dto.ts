import {
  pickPlayableCharacterInputSchema,
  pickPlayableCharacterOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PickPlayableCharacterInputDto extends createZodDto(
  pickPlayableCharacterInputSchema,
) {}

export class PickPlayableCharacterOutputDto extends createZodDto(
  pickPlayableCharacterOutputSchema,
) {}
