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
		'10;5     0,0;0,1;0,2;0,3;0,4      1,0;trap   2,0;wall     2,1;wall     2,2;door     2,3;wall     2,4;wall     4,4;pillar     8,0;wall     8,1;wall     8,2;wall     8,3;wall     8,4;wall',
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
		'00T1001',
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