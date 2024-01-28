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
		'00T0001',
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