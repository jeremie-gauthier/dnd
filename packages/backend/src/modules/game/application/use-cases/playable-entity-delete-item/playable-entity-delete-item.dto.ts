import {
  playableEntityDeleteItemInputSchema,
  playableEntityDeleteItemOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PlayableEntityDeleteItemInputDto extends createZodDto(
  playableEntityDeleteItemInputSchema,
) {}

export class PlayableEntityDeleteItemOutputDto extends createZodDto(
  playableEntityDeleteItemOutputSchema,
) {}
