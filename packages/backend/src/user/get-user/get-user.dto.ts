import { getUserInputSchema, getUserOutputSchema } from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class GetUserInputDto extends createZodDto(getUserInputSchema) {}

export class GetUserOutputDto extends createZodDto(getUserOutputSchema) {}
