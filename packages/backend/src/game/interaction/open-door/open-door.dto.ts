import { openDoorInputSchema, openDoorOutputSchema } from '@dnd/shared';
import { createZodDto } from 'nestjs-zod';

export class OpenDoorInputDto extends createZodDto(openDoorInputSchema) {}

export class OpenDoorOutputDto extends createZodDto(openDoorOutputSchema) {}
