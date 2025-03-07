INSERT INTO
  "room" ("id", "has_been_visited")
VALUES
  ('226a75d9-dfe3-484e-bcdb-f1ebc698c814', 'f'),
  ('3a449be8-1f93-4946-ad0b-6783f3d9c748', 'f'),
  ('e1d348cc-9322-4509-9735-9bd29026de6d', 't'),
  ('4a5c66df-cb67-47ae-bdd7-3055247a5a4c', 'f'),
  ('7ee1d2b6-42ac-4336-8182-2c1c016e0846', 'f'),
  ('5ad883a6-15f4-46dd-99a7-8952e3c6c5cc', 'f');

INSERT INTO
  "bounding_box" (
    "id",
    "room_id",
    "top_left_row",
    "top_left_column",
    "bottom_right_row",
    "bottom_right_column"
  )
VALUES
  (
    '159654d8-9eca-4cf3-8f08-a3606701ff00',
    '226a75d9-dfe3-484e-bcdb-f1ebc698c814',
    0,
    5,
    8,
    12
  ),
  (
    'f4970b41-f8f0-4062-b950-67454babbd2d',
    '3a449be8-1f93-4946-ad0b-6783f3d9c748',
    0,
    12,
    7,
    18
  ),
  (
    '75065db4-ad67-450d-bbf4-8829c96bed6e',
    'e1d348cc-9322-4509-9735-9bd29026de6d',
    0,
    20,
    5,
    24
  ),
  (
    'e714a7ef-e097-4f9e-a708-c747a6dc6739',
    '4a5c66df-cb67-47ae-bdd7-3055247a5a4c',
    5,
    19,
    12,
    24
  ),
  (
    'd3ab2d1d-de63-46fc-85e3-75da2daeca11',
    '7ee1d2b6-42ac-4336-8182-2c1c016e0846',
    8,
    0,
    12,
    12
  ),
  (
    '5fb660fa-fcaf-494f-a4b4-8097184e9d34',
    '5ad883a6-15f4-46dd-99a7-8952e3c6c5cc',
    9,
    12,
    12,
    19
  );