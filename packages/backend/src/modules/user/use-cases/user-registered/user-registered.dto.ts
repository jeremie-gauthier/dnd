import {
  userRegisteredInputSchema,
  userRegisteredOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class UserRegisteredInputDto extends createZodDto(
  userRegisteredInputSchema,
) {}

export class UserRegisteredOutputDto extends createZodDto(
  userRegisteredOutputSchema,
) {}
