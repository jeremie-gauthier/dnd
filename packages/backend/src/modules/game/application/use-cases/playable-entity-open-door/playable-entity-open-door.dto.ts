import { openDoorInputSchema, openDoorOutputSchema } from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PlayableEntityOpenDoorInputDto extends createZodDto(
  openDoorInputSchema,
) {}

export class PlayableEntityOpenDoorOutputDto extends createZodDto(
  openDoorOutputSchema,
) {}
