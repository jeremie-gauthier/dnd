import {
  playableEntityLootItemInputSchema,
  playableEntityLootItemOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PlayableEntityLootItemInputDto extends createZodDto(
  playableEntityLootItemInputSchema,
) {}

export class PlayableEntityLootItemOutputDto extends createZodDto(
  playableEntityLootItemOutputSchema,
) {}
