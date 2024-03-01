import { getLobbiesInputSchema, getLobbiesOutputSchema } from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class GetLobbiesInputDto extends createZodDto(getLobbiesInputSchema) {}

export class GetLobbiesOutputDto extends createZodDto(getLobbiesOutputSchema) {}
