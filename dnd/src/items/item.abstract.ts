import { Artifact } from './artifacts/artifact.abstract';
import type { Spell } from './spells/spell.abstract';
import type { Weapon } from './weapons/weapon.abstract';

export abstract class Item {
  abstract readonly name: string;
  abstract readonly type: 'weapon' | 'artifact' | 'spell';

  public isWeapon(): this is Weapon {
    return this.type === 'weapon';
  }

  public isSpell(): this is Spell {
    return this.type === 'spell';
  }

  public isArtifact(): this is Artifact {
    return this.type === 'artifact';
  }
}
