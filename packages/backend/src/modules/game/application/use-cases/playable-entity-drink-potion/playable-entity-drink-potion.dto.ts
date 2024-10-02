import {
  playableEntityDrinkPotionInputSchema,
  playableEntityDrinkPotionOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PlayableEntityDrinkPotionInputDto extends createZodDto(
  playableEntityDrinkPotionInputSchema,
) {}

export class PlayableEntityDrinkPotionOutputDto extends createZodDto(
  playableEntityDrinkPotionOutputSchema,
) {}
