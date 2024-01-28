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