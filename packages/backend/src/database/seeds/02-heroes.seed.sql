INSERT INTO
  hero_ui (name, img_url)
VALUES
  (
    'Regdar',
    'https://jergauth-dnd-assets.s3.eu-west-3.amazonaws.com/heroes/Regdar.webp'
  ),
  (
    'Lidda',
    'https://jergauth-dnd-assets.s3.eu-west-3.amazonaws.com/heroes/Lidda.webp'
  ),
  (
    'Mialyë',
    'https://jergauth-dnd-assets.s3.eu-west-3.amazonaws.com/heroes/Mialyë.webp'
  ),
  (
    'Jozan',
    'https://jergauth-dnd-assets.s3.eu-west-3.amazonaws.com/heroes/Jozan.webp'
  );

INSERT INTO
  hero_template (
    name,
    TYPE,
    race,
    class,
    LEVEL,
    characteristic_base_action_points,
    characteristic_base_movement_points,
    characteristic_base_armor_class,
    characteristic_base_mana_points,
    characteristic_base_health_points,
    inventory
  )
VALUES
  (
    'Regdar',
    'humanoid',
    'human',
    'WARRIOR',
    1,
    2,
    4,
    2,
    0,
    8,
    '{"storageCapacity": {"nbArtifactSlots": 1, "nbSpellSlots": 0, "nbWeaponSlots": 2, "nbBackpackSlots": 1}, "items": [{"storageSpace": "GEAR", "itemName": "broadsword_1"}]}'
  ),
  (
    'Regdar',
    'humanoid',
    'human',
    'WARRIOR',
    2,
    2,
    4,
    2,
    0,
    12,
    '{"storageCapacity": {"nbArtifactSlots": 1, "nbSpellSlots": 0, "nbWeaponSlots": 2, "nbBackpackSlots": 1}, "items": []}'
  ),
  (
    'Regdar',
    'humanoid',
    'human',
    'WARRIOR',
    3,
    2,
    4,
    2,
    0,
    15,
    '{"storageCapacity": {"nbArtifactSlots": 1, "nbSpellSlots": 0, "nbWeaponSlots": 2, "nbBackpackSlots": 1}, "items": []}'
  ),
  (
    'Lidda',
    'humanoid',
    'halfling',
    'THIEF',
    1,
    2,
    6,
    2,
    0,
    5,
    '{"storageCapacity": {"nbArtifactSlots": 2, "nbSpellSlots": 0, "nbWeaponSlots": 1, "nbBackpackSlots": 1}, "items": [{"storageSpace": "GEAR", "itemName": "throwing_dagger_1"}]}'
  ),
  (
    'Lidda',
    'humanoid',
    'halfling',
    'THIEF',
    2,
    2,
    6,
    2,
    0,
    7,
    '{"storageCapacity": {"nbArtifactSlots": 2, "nbSpellSlots": 0, "nbWeaponSlots": 1, "nbBackpackSlots": 1}, "items": []}'
  ),
  (
    'Lidda',
    'humanoid',
    'halfling',
    'THIEF',
    3,
    2,
    6,
    2,
    0,
    9,
    '{"storageCapacity": {"nbArtifactSlots": 2, "nbSpellSlots": 0, "nbWeaponSlots": 1, "nbBackpackSlots": 1}, "items": []}'
  ),
  (
    'Mialyë',
    'humanoid',
    'elf',
    'SORCERER',
    1,
    2,
    5,
    2,
    5,
    5,
    '{"storageCapacity": {"nbArtifactSlots": 1, "nbSpellSlots": 1, "nbWeaponSlots": 1, "nbBackpackSlots": 2}, "items": [{"storageSpace": "GEAR", "itemName": "magic_shot_1"}, {"storageSpace": "GEAR", "itemName": "elders_shortbow_1"}]}'
  ),
  (
    'Mialyë',
    'humanoid',
    'elf',
    'SORCERER',
    2,
    2,
    5,
    2,
    7,
    7,
    '{"storageCapacity": {"nbArtifactSlots": 1, "nbSpellSlots": 1, "nbWeaponSlots": 1, "nbBackpackSlots": 2}, "items": []}'
  ),
  (
    'Mialyë',
    'humanoid',
    'elf',
    'SORCERER',
    3,
    2,
    5,
    2,
    9,
    9,
    '{"storageCapacity": {"nbArtifactSlots": 1, "nbSpellSlots": 1, "nbWeaponSlots": 1, "nbBackpackSlots": 2}, "items": []}'
  ),
  (
    'Jozan',
    'humanoid',
    'human',
    'CLERIC',
    1,
    2,
    5,
    2,
    5,
    5,
    '{"storageCapacity": {"nbArtifactSlots": 1, "nbSpellSlots": 1, "nbWeaponSlots": 1, "nbBackpackSlots": 2}, "items": [{"storageSpace": "GEAR", "itemName": "faith_crossbow_1"}]}'
  ),
  (
    'Jozan',
    'humanoid',
    'human',
    'CLERIC',
    2,
    2,
    5,
    2,
    5,
    7,
    '{"storageCapacity": {"nbArtifactSlots": 1, "nbSpellSlots": 1, "nbWeaponSlots": 1, "nbBackpackSlots": 2}, "items": []}'
  ),
  (
    'Jozan',
    'humanoid',
    'human',
    'CLERIC',
    3,
    2,
    5,
    2,
    5,
    9,
    '{"storageCapacity": {"nbArtifactSlots": 1, "nbSpellSlots": 1, "nbWeaponSlots": 1, "nbBackpackSlots": 2}, "items": []}'
  );