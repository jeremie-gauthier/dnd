INSERT INTO
  campaign (title, STATUS)
VALUES
  ('Campagne 1', 'AVAILABLE');

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
        title = 'Campagne 1'
    ),
    1,
    'Les bandits gobelins',
    'Le mal et les ténèbres se sont abattus sur le pays de Rallion et la région est devenue la proie des Monstres...',
    'Félicitations ! Vous avez vaincu les bandits gobelins...',
    '{"height":12,"width":5,"startingPositions":[{"row":2,"column":2},{"row":2,"column":3},{"row":2,"column":4},{"row":3,"column":2},{"row":3,"column":3},{"row":3,"column":4}],"entities":[{"row":5,"column":0,"kind":"wall"},{"row":5,"column":1,"kind":"wall"},{"row":5,"column":2,"kind":"wall"},{"row":5,"column":3,"kind":"door"},{"row":5,"column":4,"kind":"wall"}],"events":[{"name":"on_door_opening","doorCoord":{"row":5,"column":3},"action":"spawn_enemies","enemies":["goblin"],"startingTiles":[{"row":6,"column":0},{"row":7,"column":1},{"row":8,"column":2},{"row":7,"column":3},{"row":6,"column":4}]}]}',
    'AVAILABLE'
  ),
  (
    (
      SELECT
        id
      FROM
        campaign
      WHERE
        title = 'Campagne 1'
    ),
    2,
    'Les bandits gobelins, le retour',
    'Introduction du 2e stage',
    'Conclusion du 2e stage',
    '{}',
    'AVAILABLE'
  );

;

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
        title = 'Campagne 1'
    ),
    (
      SELECT
        id
      FROM
        hero_template
      WHERE
        name = 'Regdar'
        AND LEVEL = 1
    )
  ),
  (
    (
      SELECT
        id
      FROM
        campaign
      WHERE
        title = 'Campagne 1'
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
  ),
  (
    (
      SELECT
        id
      FROM
        campaign
      WHERE
        title = 'Campagne 1'
    ),
    (
      SELECT
        id
      FROM
        hero_template
      WHERE
        name = 'Mialyë'
        AND LEVEL = 1
    )
  ),
  (
    (
      SELECT
        id
      FROM
        campaign
      WHERE
        title = 'Campagne 1'
    ),
    (
      SELECT
        id
      FROM
        hero_template
      WHERE
        name = 'Lidda'
        AND LEVEL = 1
    )
  );