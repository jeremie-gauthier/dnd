import { leaveLobbyInputSchema, leaveLobbyOutputSchema } from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class LeaveLobbyInputDto extends createZodDto(leaveLobbyInputSchema) {}

export class LeaveLobbyOutputDto extends createZodDto(leaveLobbyOutputSchema) {}
