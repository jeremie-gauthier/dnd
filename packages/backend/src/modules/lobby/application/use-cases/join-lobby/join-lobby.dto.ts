import { joinLobbyInputSchema, joinLobbyOutputSchema } from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class JoinLobbyInputDto extends createZodDto(joinLobbyInputSchema) {}

export class JoinLobbyOutputDto extends createZodDto(joinLobbyOutputSchema) {}
