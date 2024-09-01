import {
  playableEntitySwapItemsInputSchema,
  playableEntitySwapItemsOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PlayableEntitySwapItemsInputDto extends createZodDto(
  playableEntitySwapItemsInputSchema,
) {}

export class PlayableEntitySwapItemsOutputDto extends createZodDto(
  playableEntitySwapItemsOutputSchema,
) {}
