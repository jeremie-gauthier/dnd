INSERT INTO
  "item_perk" ("id", "perk_name")
VALUES
  (
    '7baea0f9-96b0-4328-9178-e278da93091e',
    'breakable'
  ),
  (
    '245d29f7-0b73-4cba-8967-355844c7eae8',
    'breakable'
  ),
  (
    'c0139742-8953-41bb-9da2-77d4ec038049',
    'breakable'
  ),
  (
    'e5789b9f-87e7-4843-adf1-32479f9cffb9',
    'breakable'
  );

INSERT INTO
  "item_item_perks_item_perk" ("item_name", "item_perk_id")
VALUES
  (
    'boccobs_cloak_1',
    '7baea0f9-96b0-4328-9178-e278da93091e'
  ),
  (
    'ring_of_shadows_1',
    '245d29f7-0b73-4cba-8967-355844c7eae8'
  ),
  (
    'summoners_horn_1',
    'c0139742-8953-41bb-9da2-77d4ec038049'
  ),
  (
    'bark_skin_cloak_1',
    'e5789b9f-87e7-4843-adf1-32479f9cffb9'
  );

INSERT INTO
  "item_mana_costs_mana_cost" ("item_name", "mana_cost_id")
VALUES
  ('magic_shot_1', 'SORCERER_2'),
  ('magic_shot_1', 'CLERIC_3'),
  ('pillar_of_fire_1', 'CLERIC_8'),
  ('pillar_of_fire_1', 'SORCERER_7'),
  ('energy_shield_1', 'CLERIC_5'),
  ('energy_shield_1', 'SORCERER_4'),
  ('force_cage_1', 'CLERIC_5'),
  ('force_cage_1', 'SORCERER_4'),
  ('ultimate_restauration_1', 'CLERIC_4'),
  ('invisible_servant_1', 'CLERIC_3'),
  ('invisible_servant_1', 'SORCERER_2'),
  ('partial_healing_circle_1', 'CLERIC_2'),
  ('partial_healing_circle_1', 'SORCERER_4'),
  ('ray_of_frost_1', 'CLERIC_4'),
  ('ray_of_frost_1', 'SORCERER_3'),
  ('melfs_acid_arrow_1', 'CLERIC_4'),
  ('melfs_acid_arrow_1', 'SORCERER_3'),
  ('flaming_arrows_1', 'CLERIC_4'),
  ('flaming_arrows_1', 'SORCERER_3'),
  ('burning_hands_1', 'CLERIC_4'),
  ('burning_hands_1', 'SORCERER_3');

INSERT INTO
  "item_perk_dice_throw" ("id", "dice_name", "cause_id")
VALUES
  (
    '7574ae42-ae82-45c3-a2b9-2581f4b0e205',
    'special',
    '7baea0f9-96b0-4328-9178-e278da93091e'
  ),
  (
    'b001d92b-302f-4f75-bbd7-68821567872e',
    'special',
    '245d29f7-0b73-4cba-8967-355844c7eae8'
  ),
  (
    'cb8a7e3b-a741-471e-8ac8-da1148ef68f0',
    'special',
    'c0139742-8953-41bb-9da2-77d4ec038049'
  ),
  (
    '0037dc04-4885-4564-af6e-e1f2b14ff1f4',
    'special',
    'e5789b9f-87e7-4843-adf1-32479f9cffb9'
  );

INSERT INTO
  "spell_attack" ("id", "range", "type", "attack_item_name")
VALUES
  (
    '17d1ee5b-3e1e-4c14-a0f7-6d8132f64d7b',
    'long',
    'regular',
    'magic_shot_1'
  ),
  (
    'b6bdb377-fbbb-43d0-93b1-6bbf4fb1932f',
    'long',
    'regular',
    'pillar_of_fire_1'
  ),
  (
    'a8213caf-29ba-4407-818d-023393e5fa09',
    'versatile',
    'regular',
    'force_cage_1'
  ),
  (
    'c7fa0033-eadb-4181-b86b-1aa29410bf71',
    'long',
    'regular',
    'ray_of_frost_1'
  ),
  (
    '2e5396cc-b2d5-4042-95a8-a3622d59cda9',
    'long',
    'regular',
    'melfs_acid_arrow_1'
  ),
  (
    '99c2bc23-fbde-499d-9775-695313ce31bf',
    'long',
    'regular',
    'flaming_arrows_1'
  ),
  (
    '6b583ff2-35df-40f9-be58-06ea542e74e3',
    'melee',
    'regular',
    'burning_hands_1'
  );

INSERT INTO
  "spell_attack_dice_throw" ("id", "dice_name", "cause_id")
VALUES
  (
    'a6a7be52-898c-43fe-a03c-f88d86a76d62',
    'yellow',
    '17d1ee5b-3e1e-4c14-a0f7-6d8132f64d7b'
  ),
  (
    '86fcd259-44b2-4542-8e2e-942e8a4843c0',
    'red',
    '17d1ee5b-3e1e-4c14-a0f7-6d8132f64d7b'
  ),
  (
    '5d813775-b89d-436a-ac2e-7b0e09632bd2',
    'orange',
    'b6bdb377-fbbb-43d0-93b1-6bbf4fb1932f'
  ),
  (
    '09c316af-d537-4ec1-b17b-02d8fc5b1376',
    'orange',
    'b6bdb377-fbbb-43d0-93b1-6bbf4fb1932f'
  ),
  (
    '7cce2bef-f083-4670-9404-047282407243',
    'red',
    'b6bdb377-fbbb-43d0-93b1-6bbf4fb1932f'
  ),
  (
    '39b47533-2268-4ba1-9bf8-ae887a5cbcc3',
    'purple',
    'b6bdb377-fbbb-43d0-93b1-6bbf4fb1932f'
  ),
  (
    'f4d552be-451a-4ab5-a0eb-4b83bb431ca4',
    'yellow',
    'a8213caf-29ba-4407-818d-023393e5fa09'
  ),
  (
    '1a94a561-921c-4fb3-85bc-4a7b968f4d29',
    'orange',
    'a8213caf-29ba-4407-818d-023393e5fa09'
  ),
  (
    'efd78ad9-4836-4b34-a7c0-3ca929bb906f',
    'red',
    'a8213caf-29ba-4407-818d-023393e5fa09'
  ),
  (
    'b8d58379-6f6b-4f4a-861c-be0cad373b68',
    'special',
    'a8213caf-29ba-4407-818d-023393e5fa09'
  ),
  (
    '700aba37-cf7f-4eb1-a7b7-6258a53d5125',
    'yellow',
    'c7fa0033-eadb-4181-b86b-1aa29410bf71'
  ),
  (
    'a96f9324-13ab-4999-9936-467a5cd20c11',
    'red',
    'c7fa0033-eadb-4181-b86b-1aa29410bf71'
  ),
  (
    'd06557f6-9933-4944-a679-37da0363f9eb',
    'special',
    'c7fa0033-eadb-4181-b86b-1aa29410bf71'
  ),
  (
    '4e85319d-5317-4ca2-af77-43440066ebc2',
    'orange',
    '2e5396cc-b2d5-4042-95a8-a3622d59cda9'
  ),
  (
    'c9cf7d91-4df1-4c2e-9364-809db45337b4',
    'red',
    '2e5396cc-b2d5-4042-95a8-a3622d59cda9'
  ),
  (
    '57d0520a-a136-444d-8498-c7b23de473a0',
    'special',
    '2e5396cc-b2d5-4042-95a8-a3622d59cda9'
  ),
  (
    '9d4c7f0e-347f-49bd-9339-1501fa114dec',
    'yellow',
    '99c2bc23-fbde-499d-9775-695313ce31bf'
  ),
  (
    'ab340ecb-b906-4378-bb68-da26fede6df2',
    'yellow',
    '99c2bc23-fbde-499d-9775-695313ce31bf'
  ),
  (
    'ec9f2b64-d970-4cf3-ab4e-5c8719a74739',
    'red',
    '99c2bc23-fbde-499d-9775-695313ce31bf'
  ),
  (
    'fd3a98df-7dac-4d46-85e9-3b3d56718a99',
    'orange',
    '6b583ff2-35df-40f9-be58-06ea542e74e3'
  ),
  (
    '20bd0952-b835-4c3e-97ad-7915c4fbbebd',
    'red',
    '6b583ff2-35df-40f9-be58-06ea542e74e3'
  );

INSERT INTO
  "spell_attack_perks_perk" ("spell_attack_id", "perk_name")
VALUES
  (
    'b6bdb377-fbbb-43d0-93b1-6bbf4fb1932f',
    'reroll_one_dice'
  ),
  ('a8213caf-29ba-4407-818d-023393e5fa09', 'stop'),
  ('c7fa0033-eadb-4181-b86b-1aa29410bf71', 'frozen'),
  (
    '2e5396cc-b2d5-4042-95a8-a3622d59cda9',
    'ignore_armor_class'
  ),
  (
    '99c2bc23-fbde-499d-9775-695313ce31bf',
    'reroll_one_dice'
  );

INSERT INTO
  "weapon_attack" ("id", "range", "type", "attack_item_name")
VALUES
  (
    '9d9b766c-d186-433d-a200-ff84190635d1',
    'melee',
    'regular',
    'broadsword_1'
  ),
  (
    '11f040ca-f86d-47d1-8039-28cb7972615d',
    'long',
    'regular',
    'faith_crossbow_1'
  ),
  (
    '3aeabc33-e915-4cf5-bad7-d4a39382c8d5',
    'long',
    'regular',
    'throwing_dagger_1'
  ),
  (
    'ca5e540f-2f01-48da-8224-8db77c13c5be',
    'long',
    'super',
    'throwing_dagger_1'
  ),
  (
    '9ceb4e08-1029-4c7e-bb6d-7e1f75f12848',
    'long',
    'regular',
    'elders_shortbow_1'
  ),
  (
    'f5880895-779e-40c4-a812-9d523ae0f7b1',
    'melee',
    'regular',
    'goblin_scimitar_1'
  ),
  (
    '58d40174-57ae-46d2-aae4-f07971e60d9e',
    'melee',
    'regular',
    'bugbear_mace_1'
  ),
  (
    '4af63a0c-285f-4a52-a3af-d39402e54a88',
    'melee',
    'regular',
    'faith_mace_1'
  ),
  (
    '668ef395-9979-4d76-8674-adeeb88fe60e',
    'melee',
    'regular',
    'master_axe_1'
  ),
  (
    '4f7c7678-9ea4-464a-acd2-509f7a6ee6ec',
    'melee',
    'super',
    'master_axe_1'
  ),
  (
    '6e355f1b-9476-4dde-98cb-d51692ff8974',
    'long',
    'regular',
    'flash_bombs_1'
  ),
  (
    'fae9c59d-eeb7-4741-a184-4916c26537cd',
    'long',
    'regular',
    'poisoned_blowpipe_1'
  ),
  (
    '73adee84-389a-45c6-8771-ee3b8553056a',
    'melee',
    'regular',
    'sword_of_outcast_kings_1'
  ),
  (
    'ad2f66dd-e699-4ae0-860b-5c634bd84529',
    'melee',
    'regular',
    'tormented_sword_of_slavery_1'
  ),
  (
    '53c9319e-9afc-40a4-ac27-e62f1a42a517',
    'long',
    'regular',
    'bow_of_freedom_1'
  ),
  (
    'b788e964-f637-481b-989a-b049e405591b',
    'long',
    'regular',
    'elves_blessed_bow_1'
  ),
  (
    '6de52fc6-89b9-4ff8-a402-79625876f9bf',
    'melee',
    'regular',
    'trusty_dwarven_forging_axe_1'
  ),
  (
    '92a505fb-fcf5-4a5d-8017-ed528161f13f',
    'long',
    'regular',
    'dragons_fury_1'
  ),
  (
    '5ea2379a-922c-4646-a72a-e3c73429a86f',
    'melee',
    'regular',
    'kords_unsubmissive_servant_1'
  ),
  (
    '96c70173-1694-4a18-a935-1ce8f7b2b2a9',
    'melee',
    'regular',
    'herald_of_pain_1'
  ),
  (
    '0c2558a2-05b9-4a94-8b19-d89916f46d9d',
    'melee',
    'regular',
    'two_handed_broadsword_1'
  ),
  (
    'df476f05-1567-413d-9537-3074891092a2',
    'melee',
    'regular',
    'bone_splitter_1'
  ),
  (
    'd32ecf48-b6d9-4044-b43e-8645def93e02',
    'melee',
    'super',
    'bone_splitter_1'
  ),
  (
    '8cdabdd9-b159-474c-ac45-3adc37b14007',
    'melee',
    'regular',
    'hammer_of_freedom_1'
  );

INSERT INTO
  "weapon_attack_perks_perk" ("weapon_attack_id", "perk_name")
VALUES
  (
    '11f040ca-f86d-47d1-8039-28cb7972615d',
    'mana_leech'
  ),
  (
    'ca5e540f-2f01-48da-8224-8db77c13c5be',
    'breakable'
  ),
  (
    '9ceb4e08-1029-4c7e-bb6d-7e1f75f12848',
    'mana_leech'
  ),
  (
    '4af63a0c-285f-4a52-a3af-d39402e54a88',
    'mana_leech'
  ),
  (
    '4f7c7678-9ea4-464a-acd2-509f7a6ee6ec',
    'breakable'
  ),
  ('6e355f1b-9476-4dde-98cb-d51692ff8974', 'stop'),
  (
    'fae9c59d-eeb7-4741-a184-4916c26537cd',
    'reroll_one_dice'
  ),
  (
    '73adee84-389a-45c6-8771-ee3b8553056a',
    'ignore_armor_class'
  ),
  (
    'ad2f66dd-e699-4ae0-860b-5c634bd84529',
    'blood_price'
  ),
  (
    '53c9319e-9afc-40a4-ac27-e62f1a42a517',
    'reroll_one_dice'
  ),
  (
    'b788e964-f637-481b-989a-b049e405591b',
    'reroll_one_dice'
  ),
  (
    'b788e964-f637-481b-989a-b049e405591b',
    'mana_leech'
  ),
  (
    '6de52fc6-89b9-4ff8-a402-79625876f9bf',
    'reroll_one_dice'
  ),
  (
    '92a505fb-fcf5-4a5d-8017-ed528161f13f',
    'reroll_all_dices'
  ),
  (
    '5ea2379a-922c-4646-a72a-e3c73429a86f',
    'critical_failure'
  ),
  (
    '96c70173-1694-4a18-a935-1ce8f7b2b2a9',
    'reroll_all_dices'
  ),
  (
    'd32ecf48-b6d9-4044-b43e-8645def93e02',
    'breakable'
  );