INSERT INTO
  inventory ()
INSERT INTO
  monster_template (
    race,
    archetype,
    characteristic_base_action_points,
    characteristic_base_movement_points,
    characteristic_base_armor_class,
    characteristic_base_mana_points,
    characteristic_base_health_points,
    inventory
  )
VALUES
  (
    'goblin',
    'gobelinoid',
    2,
    5,
    1,
    0,
    4,
    '{"storageCapacity": {"nbArtifactSlots": 0, "nbSpellSlots": 1, "nbWeaponSlots": 1, "nbBackpackSlots": 2}, "items": [{"storageSpace": "GEAR", "itemName": "goblin_scimitar_1"}]}'
  ),
  (
    'bugbear',
    'gobelinoid',
    2,
    4,
    2,
    0,
    7,
    '{"storageCapacity": {"nbArtifactSlots": 0, "nbSpellSlots": 1, "nbWeaponSlots": 1, "nbBackpackSlots": 2}, "items": [{"storageSpace": "GEAR", "itemName": "bugbear_mace_1"}]}'
  );