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
  ('special', '[0,0,0,1,1,1]', 0, 1, 0.5);

INSERT INTO
  "dice_ui" ("dice_name", "color")
VALUES
  ('yellow', '#FFF700'),
  ('orange', '#FF6E00'),
  ('red', '#DC143C'),
  ('special', '#000000');