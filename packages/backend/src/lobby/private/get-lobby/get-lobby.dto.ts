import { getLobbyInputSchema, getLobbyOutputSchema } from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class GetLobbyInputDto extends createZodDto(getLobbyInputSchema) {}

export class GetLobbyOutputDto extends createZodDto(getLobbyOutputSchema) {}
