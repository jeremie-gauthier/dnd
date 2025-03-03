INSERT INTO
  inventory (
    id,
    storage_capacity_nb_artifact_slots,
    storage_capacity_nb_spell_slots,
    storage_capacity_nb_weapon_slots,
    storage_capacity_nb_backpack_slots
  )
VALUES
  (
    '3ff9f62e-438b-41e1-bdfe-93b82feb9d18',
    0,
    1,
    1,
    2
  ),
  (
    'bae060b7-b882-445f-a384-2cd3a40b7f9f',
    0,
    1,
    1,
    2
  );

INSERT INTO
  inventory_item (storage_space, item_name, inventory_id)
VALUES
  (
    'gear',
    'goblin_scimitar_1',
    '3ff9f62e-438b-41e1-bdfe-93b82feb9d18'
  ),
  (
    'gear',
    'bugbear_mace_1',
    'bae060b7-b882-445f-a384-2cd3a40b7f9f'
  );

INSERT INTO
  monster_template (
    id,
    race,
    archetype,
    characteristic_base_action_points,
    characteristic_base_movement_points,
    characteristic_base_armor_class,
    characteristic_base_mana_points,
    characteristic_base_health_points,
    inventory_id
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
    '3ff9f62e-438b-41e1-bdfe-93b82feb9d18'
  ),
  (
    'bugbear',
    'gobelinoid',
    2,
    4,
    2,
    0,
    7,
    'bae060b7-b882-445f-a384-2cd3a40b7f9f'
  );