import z from 'zod';

export const coordSchema = z.object({
  x: z.number().positive(),
  y: z.number().positive(),
});

export const entityBaseSchema = z.object({
  name: z.string().readonly(),
  description: z.string().readonly(),
  type: z.string().readonly(),
  isPlayable: z.boolean().readonly(),
  isBlocking: z.boolean(),
  coord: coordSchema,
});
