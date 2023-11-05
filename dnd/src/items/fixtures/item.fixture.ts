import { Item } from '../item.abstract';

export class MockWeaponItem extends Item {
  name = 'mock-weapon-item';
  type: 'weapon' | 'artifact' | 'spell' = 'weapon';
}

export class MockSpellItem extends Item {
  name = 'mock-spell-item';
  type: 'weapon' | 'artifact' | 'spell' = 'spell';
}

export class MockArtifactItem extends Item {
  name = 'mock-artifact-item';
  type: 'weapon' | 'artifact' | 'spell' = 'artifact';
}

export class MockUnknownItem extends Item {
  name = 'mock-unknown-item';
  type: 'weapon' | 'artifact' | 'spell' = 'unknown' as
    | 'weapon'
    | 'artifact'
    | 'spell';
}
