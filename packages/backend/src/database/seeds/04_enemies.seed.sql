INSERT INTO
  enemy_template (
    name,
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
    2,
    5,
    1,
    0,
    4,
    -- '{"gear":[{"type":"Weapon","name":"goblin_scimitar_1","level":1,"imgUrl":"","attacks":[{"range":"melee","type":"regular","dices":["yellow","yellow","orange"]}],"perks":[]}],"backpack":[]}'
    '{"storageCapacity": {"nbArtifactSlots": 0, "nbSpellSlots": 1, "nbWeaponSlots": 1, "nbBackpackSlots": 2}, "items": [{"storageSpace": "GEAR", "itemName": "goblin_scimitar_1"}]}'
  ),
  (
    'bugbear',
    2,
    4,
    2,
    0,
    7,
    '{"gear":[{"type":"Weapon","name":"bugbear_mace_1","level":1,"imgUrl":"","attacks":[{"range":"melee","type":"regular","dices":["yellow","yellow","red"]}],"perks":[]}],"backpack":[]}'
  );