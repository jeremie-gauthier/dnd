INSERT INTO
  enemy_template (
    name,
    characteristic_base_action_points,
    characteristic_base_movement_points,
    characteristic_base_armor_class,
    characteristic_base_mana_points,
    characteristic_base_health_points,
    attacks
  )
VALUES
  (
    'goblin',
    2,
    5,
    1,
    0,
    4,
    '[{"range": "melee", "dices": ["yellow", "yellow", "orange"]}]'
  ),
  (
    'bugbear',
    2,
    4,
    2,
    0,
    7,
    '[{"range": "melee", "dices": ["yellow", "yellow", "red"]}]'
  );