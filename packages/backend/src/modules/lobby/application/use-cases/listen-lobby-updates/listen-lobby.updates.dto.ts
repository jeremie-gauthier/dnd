import {
  listenLobbyChangesInputSchema,
  listenLobbyChangesOutputSchema,
} from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class ListenLobbyChangesInputDto extends createZodDto(
  listenLobbyChangesInputSchema,
) {}

export class ListenLobbyChangesOutputDto extends createZodDto(
  listenLobbyChangesOutputSchema,
) {}
