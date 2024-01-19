import { createLobbyInputSchema, createLobbyOutputSchema } from '@dnd/shared';
import { createZodDto } from 'nestjs-zod';

export class CreateLobbyInputDto extends createZodDto(createLobbyInputSchema) {}

export class CreateLobbyOutputDto extends createZodDto(createLobbyOutputSchema) {}
