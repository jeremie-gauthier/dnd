import {
  playableEntityMoveInputSchema,
  playableEntityMoveOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PlayableEntityMoveInputDto extends createZodDto(
  playableEntityMoveInputSchema,
) {}

export class PlayableEntityMoveOutputDto extends createZodDto(
  playableEntityMoveOutputSchema,
) {}
