import {
  privateUserConnectionInputSchema,
  privateUserConnectionOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PrivateUserConnectionInputDto extends createZodDto(
  privateUserConnectionInputSchema,
) {}

export class PrivateUserConnectionOutputDto extends createZodDto(
  privateUserConnectionOutputSchema,
) {}
