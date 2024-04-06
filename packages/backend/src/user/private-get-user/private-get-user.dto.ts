import {
  privateGetUserInputSchema,
  privateGetUserOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class PrivateGetUserInputDto extends createZodDto(
  privateGetUserInputSchema,
) {}

export class PrivateGetUserOutputDto extends createZodDto(
  privateGetUserOutputSchema,
) {}
