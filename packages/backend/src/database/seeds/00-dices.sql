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