import {
  playableEntityAttackInputSchema,
  playableEntityAttackOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PlayableEntityAttackInputDto extends createZodDto(
  playableEntityAttackInputSchema,
) {}

export class PlayableEntityAttackOutputDto extends createZodDto(
  playableEntityAttackOutputSchema,
) {}
