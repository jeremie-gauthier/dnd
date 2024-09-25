INSERT INTO
  "dice" (
    "name",
    "values",
    "min_value",
    "max_value",
    "mean_value"
  )
VALUES
  ('yellow', '[0,0,1,1,1,1]', 0, 1, 0.66),
  ('orange', '[1,1,1,1,2,2]', 1, 2, 1.33),
  ('red', '[0,0,1,2,2,3]', 0, 3, 1.33),
  ('purple', '[2,2,2,2,3,3]', 2, 3, 2.33),
  ('disarm_trap', '[0,1,1,1,1,1]', 0, 1, 0.83),
  ('detect_trap', '[-1,0,0,1,1,2]', -1, 2, 0.5),
  ('turn_undead', '[0,0,0,1,2,3]', 0, 3, 1),
  ('special', '[0,0,0,1,1,1]', 0, 1, 0.5);

INSERT INTO
  "dice_ui" ("dice_name", "color")
VALUES
  ('yellow', '#FFF700'),
  ('orange', '#FF6E00'),
  ('red', '#DC143C'),
  ('purple', '#581c87'),
  ('disarm_trap', '#000000'),
  ('detect_trap', '#000000'),
  ('turn_undead', '#000000'),
  ('special', '#000000');