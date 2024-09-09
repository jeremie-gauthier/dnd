import {
  playableEntityOpenChestInputSchema,
  playableEntityOpenChestOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PlayableEntityOpenChestInputDto extends createZodDto(
  playableEntityOpenChestInputSchema,
) {}

export class PlayableEntityOpenChestOutputDto extends createZodDto(
  playableEntityOpenChestOutputSchema,
) {}
