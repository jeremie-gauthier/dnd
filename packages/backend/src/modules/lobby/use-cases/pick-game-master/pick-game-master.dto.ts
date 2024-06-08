import {
  pickGameMasterInputSchema,
  pickGameMasterOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PickGameMasterInputDto extends createZodDto(
  pickGameMasterInputSchema,
) {}

export class PickGameMasterOutputDto extends createZodDto(
  pickGameMasterOutputSchema,
) {}
