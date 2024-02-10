import { togglePlayerReadyStateInputSchema, togglePlayerReadyStateOutputSchema } from '@dnd/shared';
import { createZodDto } from 'nestjs-zod';

export class TogglePlayerReadyStateInputDto extends createZodDto(
  togglePlayerReadyStateInputSchema,
) {}

export class TogglePlayerReadyStateOutputDto extends createZodDto(
  togglePlayerReadyStateOutputSchema,
) {}
