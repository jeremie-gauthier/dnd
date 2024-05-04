INSERT INTO
  campaign (title, STATUS)
VALUES
  ('Tutoriel', 'AVAILABLE');

INSERT INTO
  campaign_stage (
    campaign_id,
    "order",
    title,
    intro,
    outro,
    map_compiled,
    STATUS
  )
VALUES
  (
    (
      SELECT
        id
      FROM
        campaign
      WHERE
        title = 'Tutoriel'
    ),
    1,
    'Le déplacement',
    'Apprenez à vous déplacer dans DnD',
    'Félicitations !',
    '10;5
    0,0;0,1;0,2;0,3;0,4
    2,0;wall
    2,1;wall
    2,2;door
    2,3;wall
    2,4;wall
    4,4;pillar
    8,0;wall
    8,1;wall
    8,2;wall
    8,3;wall
    8,4;wall',
    'AVAILABLE'
  );

INSERT INTO
  campaign_playable_heroes_hero_template (campaign_id, hero_template_id)
VALUES
  (
    (
      SELECT
        id
      FROM
        campaign
      WHERE
        title = 'Tutoriel'
    ),
    (
      SELECT
        id
      FROM
        hero_template
      WHERE
        name = 'Jozan'
        AND LEVEL = 1
    )
  );