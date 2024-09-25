INSERT INTO
  "translation" ("locale", "namespace", "translations")
VALUES
  (
    'fr-FR',
    'profile',
    '{"title": "Bienvenu sur la page profil"}'
  ),
  (
    'fr-FR',
    'common',
    '{"cancel": "Annuler", "confirm": "Confirmer"}'
  ),
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
  "game.update.playable_entity_attacked": "{{attackerEntityName}} attaque {{targetEntityName}} avec $t(items:{{attackItemUsedName}}) et inflige {{attackPower}} ({{diceScore}} + {{bonusScore}}) point(s) de dégât.",
  "game.update.playable_entity_took_damage": "{{entityName}} subit {{damageDone}} point(s) de dégât. {{entityHpLeft}} pv restant(s).",
  "game.status.win": "Victoire des héros !"
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
  "elders_shortbow_1": "Arc court des anciens",
  "goblin_scimitar_1": "Cimeterre gobelin",
  "bugbear_mace_1": "Masse de gobelours",
  "faith_mace_1": "Masse d''arme de la foi",
  "flash_bombs_1": "Bombes flash",
  "master_axe_1": "Hache du maître",
  "poisoned_blowpipe_1": "Sarbacane empoisonnée",
  "sword_of_outcast_kings_1": "Lame des rois proscrits",
  "tormented_sword_of_slavery_1": "Épée tourmentée d''esclavage",
  "bow_of_freedom_1": "Arc de liberté",
  "elves_blessed_bow_1": "Arc béni des elfes",
  "trusty_dwarven_forging_axe_1": "Fidèle hache de forge naine",
  "dragons_fury_1": "Furie du dragon",
  "kords_unsubmissive_servant_1": "Serviteur insoumis de Kord",
  "herald_of_pain_1": "Héraut de la douleur",
  "two_handed_broadsword_1": "Épée large à deux mains",
  "bone_splitter_1": "Fendoir à os",
  "hammer_of_freedom_1": "Marteau de liberté",
  "pillar_of_fire_1": "Colonne de feu",
  "energy_shield_1": "Bouclier d''énergie",
  "force_cage_1": "Cage de force",
  "ultimate_restauration_1": "Restauration suprême",
  "invisible_servant_1": "Serviteur invisible",
  "partial_healing_circle_1": "Cercle de guérison partielle",
  "call_from_the_grave_1": "Appel de la tombe",
  "voices_of_the_damned_1": "Voix des damnés",
  "dazzling_light_1": "Lumière aveuglante",
  "smothering_mist_1": "Brume étouffante",
  "brutal_betrayal_1": "Trahison brutale",
  "magic_loss_1": "Perte de magie",
  "blanket_of_flames_1": "Couverture de flammes",
  "ray_of_frost_1": "Rayon de givre",
  "melfs_acid_arrow_1": "Flèche acide de Melf",
  "flaming_arrows_1": "Flèches enflammées",
  "burning_hands_1": "Mains brûlantes",
  "orb_of_lucid_vision_1": "Orbe de vision lucide",
  "boccobs_cloak_1": "Cape de Boccob",
  "yonddalla_amulet_1": "Amulette de Yonddalla",
  "ring_of_shadows_1": "Anneau des ombres",
  "summoners_horn_1": "Cor de l''invocateur",
  "bark_skin_cloak_1": "Cape en peau d''écorce",
  "olidammara_amulet_1": "Amulette d''Olidammara",
  "potion_of_weakness_1": "Potion de faiblesse",
  "smoke_shadow_potion_1": "Potion d''ombre fumigène",
  "kords_blessing_potion_1": "Potion de bénédiction de Kord",
  "imperious_hand_potion_1": "Potion de main impérieuse",
  "potion_of_laughter_1": "Potion de fou rire",
  "olidammara_wisdom_potion_1": "Potion de la sagesse d''Olidammara",
  "partial_restoration_potion_1": "Potion de restauration partielle",
  "initiative_potion_1": "Potion d''initiative",
  "ultimate_restoration_potion_1": "Potion de restauration suprême",
  "light_healing_potion_1": "Potion de soins légers"
}'
  ),
  (
    'fr-FR',
    'heroes',
    '{
  "SORCERER": "MAGICIENNE",
  "CLERIC": "CLERC",
  "WARRIOR": "GUERRIER",
  "THIEF": "ROUBLARDE"
}'
  ),
  (
    'fr-FR',
    'inventory',
    '{
  "chest": "Coffre",
  "chest_loot_title": "Butin obtenu",
  "refuse_loot": "Abandonner le butin",
  "inventory_title": "Feuille de personnage",
  "confirm_deletion_prompt": "Supprimer cet objet ? (1PA)",
  "confirm_deletion_instructions": "Relâchez pour confirmer",
  "confirm_swap_prompt": "Échanger ces objets de place ? (1PA)",
  "confirm_swap_instructions": "Relâchez pour confirmer",
  "confirm_move_prompt": "Déplacer cet objet ? (1PA)",
  "confirm_move_instructions": "Relâchez pour confirmer",
  "confirm_loot_swap_prompt": "Remplacer cet objet par le butin ?",
  "confirm_loot_swap_instructions": "Relâchez pour confirmer",
  "gear": "Équipement",
  "backpack": "Sac à dos",
  "heroIdentity": "{{class}} NIVEAU {{level}}",
  "monsterIdentity": "{{kind}}"
}'
  );