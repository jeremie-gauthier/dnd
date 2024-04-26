import { discardGameMasterInputSchema, discardGameMasterOutputSchema } from '@dnd/shared';
import { createZodDto } from 'nestjs-zod';

export class DiscardGameMasterInputDto extends createZodDto(discardGameMasterInputSchema) {}

export class DiscardGameMasterOutputDto extends createZodDto(discardGameMasterOutputSchema) {}
