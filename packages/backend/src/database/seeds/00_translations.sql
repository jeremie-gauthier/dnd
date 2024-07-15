INSERT INTO
  "translation" ("locale", "namespace", "translations")
VALUES
  (
    'fr-FR',
    'profile',
    '{"title": "Bienvenu sur la page profil"}'
  ),
  ('fr-FR', 'common', '{"cancel": "Annuler"}'),
  (
    'fr-FR',
    'action-log',
    '{
  "game.update.playable_entity_turn_ended": "{{entityName}} a passé son tour.",
  "game.update.playable_entity_moved": "{{entityName}} s''est déplacé.",
  "game.update.door_opened": "{{entityName}} a ouvert une porte.",
  "game.update.playable_entity_turn_started": "{{entityName}} commence son tour.",
  "game.update.monsters_spawned": "Des monstres sont apparus.",
  "game.update.initiatives_rerolled": "Les jets d''initiative ont été relancés.",
  "game.update.playable_entity_died": "{{entityName}} est mort.",
  "game.update.playable_entity_attacked": "{{attackerEntityName}} attaque {{targetEntityName}} avec $t(items:{{attackItemUsedName}}) et inflige {{attackPower}} point(s) de dégât.",
  "game.update.playable_entity_took_damage": "{{entityName}} subit {{damageDone}} point(s) de dégât. {{entityHpLeft}} pv restant(s)."
}
'
  ),
  (
    'fr-FR',
    'items',
    '{
  "regular": "Attaque normale",
  "super": "Super attaque",
  "magic_shot_1": "Projectile magique",
  "broadsword_1": "Épée large",
  "faith_crossbow_1": "Arbalète de la foi",
  "throwing_dagger_1": "Dague de lancer équilibrée",
  "elders_shortbow_1": "Arc court des anciens"
}'
  );