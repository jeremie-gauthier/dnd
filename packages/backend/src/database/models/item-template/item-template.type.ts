import { z } from 'zod';
import { artifactSchema } from './schemas/artifact.schema';
import { spellSchema } from './schemas/spell.schema';
import { weaponSchema } from './schemas/weapon.schema';

export type Artifact = z.infer<typeof artifactSchema>;
export type Spell = z.infer<typeof spellSchema>;
export type Weapon = z.infer<typeof weaponSchema>;

export type Item = Artifact | Spell | Weapon;
