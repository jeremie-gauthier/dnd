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
    STATUS,
    max_level_loot
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
    '{"height":13,"width":25,"startingPositions":[{"row":2,"column":22},{"row":2,"column":23},{"row":2,"column":24},{"row":3,"column":22},{"row":3,"column":23},{"row":3,"column":24}],"entities":[{"row":5,"column":20,"kind":"wall"},{"row":5,"column":21,"kind":"wall"},{"row":5,"column":22,"kind":"wall"},{"row":5,"column":23,"kind":"door"},{"row":5,"column":24,"kind":"wall"},{"row":0,"column":19,"kind":"wall"},{"row":1,"column":19,"kind":"wall"},{"row":2,"column":19,"kind":"wall"},{"row":3,"column":19,"kind":"wall"},{"row":4,"column":19,"kind":"wall"},{"row":5,"column":19,"kind":"wall"},{"row":6,"column":19,"kind":"wall"},{"row":7,"column":19,"kind":"wall"},{"row":8,"column":19,"kind":"wall"},{"row":9,"column":19,"kind":"wall"},{"row":10,"column":19,"kind":"door"},{"row":11,"column":19,"kind":"wall"},{"row":12,"column":19,"kind":"wall"},{"row":9,"column":17,"kind":"pillar"},{"row":9,"column":14,"kind":"pillar"},{"row":12,"column":15,"kind":"chest"},{"row":12,"column":16,"kind":"chest"},{"row":8,"column":18,"kind":"wall"},{"row":8,"column":17,"kind":"wall"},{"row":8,"column":16,"kind":"wall"},{"row":8,"column":15,"kind":"wall"},{"row":8,"column":14,"kind":"wall"},{"row":8,"column":13,"kind":"wall"},{"row":8,"column":12,"kind":"wall"},{"row":9,"column":12,"kind":"wall"},{"row":10,"column":12,"kind":"door"},{"row":11,"column":12,"kind":"wall"},{"row":12,"column":12,"kind":"wall"},{"row":8,"column":11,"kind":"wall"},{"row":8,"column":10,"kind":"wall"},{"row":8,"column":9,"kind":"wall"},{"row":8,"column":8,"kind":"door"},{"row":8,"column":7,"kind":"wall"},{"row":8,"column":6,"kind":"wall"},{"row":8,"column":5,"kind":"wall"},{"row":8,"column":4,"kind":"wall"},{"row":7,"column":4,"kind":"wall"},{"row":7,"column":3,"kind":"wall"},{"row":7,"column":2,"kind":"wall"},{"row":7,"column":1,"kind":"wall"},{"row":7,"column":0,"kind":"wall"},{"row":8,"column":0,"kind":"chest"},{"row":8,"column":1,"kind":"chest"},{"row":7,"column":5,"kind":"pillar"},{"row":4,"column":5,"kind":"pillar"},{"row":6,"column":4,"kind":"wall"},{"row":5,"column":4,"kind":"wall"},{"row":4,"column":4,"kind":"wall"},{"row":3,"column":4,"kind":"wall"},{"row":3,"column":5,"kind":"wall"},{"row":3,"column":6,"kind":"wall"},{"row":3,"column":7,"kind":"wall"},{"row":2,"column":7,"kind":"wall"},{"row":1,"column":7,"kind":"wall"},{"row":0,"column":7,"kind":"wall"},{"row":4,"column":10,"kind":"trap"},{"row":6,"column":10,"kind":"trap"},{"row":5,"column":8,"kind":"trap"},{"row":0,"column":12,"kind":"wall"},{"row":1,"column":12,"kind":"wall"},{"row":2,"column":12,"kind":"wall"},{"row":3,"column":12,"kind":"wall"},{"row":4,"column":12,"kind":"wall"},{"row":5,"column":12,"kind":"door"},{"row":6,"column":12,"kind":"wall"},{"row":7,"column":12,"kind":"wall"},{"row":1,"column":13,"kind":"chest"},{"row":6,"column":13,"kind":"chest"},{"row":0,"column":18,"kind":"chest"},{"row":2,"column":18,"kind":"chest"},{"row":5,"column":18,"kind":"chest"},{"row":7,"column":18,"kind":"chest"}],"events":[{"name":"on_door_opening","doorCoord":{"row":5,"column":23},"action":"spawn_monsters","monsters":["goblin"],"startingTiles":[{"row":6,"column":20},{"row":7,"column":21},{"row":8,"column":22},{"row":7,"column":23},{"row":6,"column":24}]},{"name":"on_door_opening","doorCoord":{"row":10,"column":12},"action":"spawn_monsters","monsters":["goblin","goblin"],"startingTiles":[{"row":10,"column":10},{"row":9,"column":9},{"row":8,"column":10},{"row":12,"column":6},{"row":10,"column":5}]},{"name":"on_door_opening","doorCoord":{"row":5,"column":12},"action":"spawn_monsters","monsters":["goblin","goblin","goblin"],"startingTiles":[{"row":2,"column":14},{"row":1,"column":16},{"row":5,"column":14},{"row":5,"column":15},{"row":7,"column":17},{"row":8,"column":14}]}],"rooms":[{"id":"room_1","hasBeenVisited":true,"boundingBoxes":[{"topLeft":{"row":0,"column":20},"bottomRight":{"row":5,"column":24}}]},{"id":"room_2","hasBeenVisited":false,"boundingBoxes":[{"topLeft":{"row":5,"column":19},"bottomRight":{"row":12,"column":24}}]},{"id":"room_3","hasBeenVisited":false,"boundingBoxes":[{"topLeft":{"row":9,"column":12},"bottomRight":{"row":12,"column":19}}]},{"id":"room_4","hasBeenVisited":false,"boundingBoxes":[{"topLeft":{"row":8,"column":0},"bottomRight":{"row":12,"column":12}}]},{"id":"room_5","hasBeenVisited":false,"boundingBoxes":[{"topLeft":{"row":0,"column":5},"bottomRight":{"row":8,"column":12}}]},{"id":"room_6","hasBeenVisited":false,"boundingBoxes":[{"topLeft":{"row":0,"column":12},"bottomRight":{"row":7,"column":18}}]}],"winConditions":[{"name":"defeat_all_monsters","nbMonstersRemaining":6}]}',
    'AVAILABLE',
    1
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
    'AVAILABLE',
    1
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