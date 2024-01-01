import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createLobbyInputSchema = z.object({
  nbPlayers: z.number().min(2).max(5),
  stageId: z.string().uuid(),
});
export class CreateLobbyInputDto extends createZodDto(createLobbyInputSchema) {}

const createLobbyOutputSchema = z.object({});
export class CreateLobbyOutputDto extends createZodDto(createLobbyOutputSchema) {}
