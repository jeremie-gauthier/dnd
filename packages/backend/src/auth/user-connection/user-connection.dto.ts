import {
  userConnectionInputSchema,
  userConnectionOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class UserConnectionInputDto extends createZodDto(
  userConnectionInputSchema,
) {}

export class UserConnectionOutputDto extends createZodDto(
  userConnectionOutputSchema,
) {}
