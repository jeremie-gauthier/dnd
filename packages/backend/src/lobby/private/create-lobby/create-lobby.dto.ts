import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createLobbyInputSchema = z.object({
  nbPlayers: z.number().min(2).max(5),
  stageId: z.string().uuid(),
});
export class CreateLobbyInputDto extends createZodDto(createLobbyInputSchema) {}

const heroSchema = z.object({
  id: z.string(),
  pickedBy: z.string().optional(),
});

const createLobbyOutputSchema = z.object({
  id: z.string(),
  host: z.object({
    userId: z.string(),
  }),
  config: z.object({
    nbPlayers: z.number(),
    stageId: z.string(),
  }),
  players: z.array(
    z.object({
      userId: z.string(),
      heroesSelected: z.array(z.string()),
    }),
  ),
  heroesAvailable: z.array(heroSchema),
});
export class CreateLobbyOutputDto extends createZodDto(createLobbyOutputSchema) {}
