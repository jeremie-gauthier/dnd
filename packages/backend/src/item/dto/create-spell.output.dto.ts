import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const createItemOutputSchema = z.object({
  generated_keys: z.array(z.string()),
});

export class CreateSpellOutputDTO extends createZodDto(createItemOutputSchema) {}