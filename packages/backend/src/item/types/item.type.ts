import { z } from 'zod';
import { artifactSchema } from '../schema/artifact.schema';
import { spellSchema } from '../schema/spell.input';
import { weaponSchema } from '../schema/weapon.input';

export type Artifact = z.infer<typeof artifactSchema>;
export type Spell = z.infer<typeof spellSchema>;
export type Weapon = z.infer<typeof weaponSchema>;

export type Item = Artifact | Spell | Weapon;
