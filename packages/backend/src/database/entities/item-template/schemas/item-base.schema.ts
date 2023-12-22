import z from 'zod';

export const itemBaseSchema = z.object({
  name: z.string(),
  description: z.string(),

  levelRequired: z.number().min(1).max(3),

  attackType: z.enum(['melee', 'range', 'mixed']),

  dices: z.array(z.enum(['yellow', 'orange', 'purple', 'red'])),
  specialActionDices: z.array(z.enum(['yellow', 'orange', 'purple', 'red'])).optional(),

  perks: z.array(z.enum(['re-roll', 'super attack'])),
});
