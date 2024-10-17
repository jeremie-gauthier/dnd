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
    '{"cancel": "Annuler", "confirm": "Confirmer", "endTurn": "Fin de tour"}'
  ),
  (
    'fr-FR',
    'lobbies',
    '{
  "pick": "Sélectionner",
  "discard": "Désélectionner",
  "ready": "Je suis prêt",
  "notReady": "Je ne suis pas prêt",
  "startGame": "Commencer la partie",
  "leave": "Quitter le salon",
  "isReady": "Prêt",
  "isNotReady": "Pas prêt",
  "host": "Hôte",
  "guest": "Invité",
  "gameMaster": "Maître du donjon",
  "gameMaster.description": "Contrôle tous les monstres",
  "chooseYourRoles": "Choisissez vos rôles",
  "players": "Joueurs",
  "hostAGame": "Héberger une partie",
  "selectCampaign": "Choisissez la campagne",
  "selectNbPlayers": "Choisissez le nombre de joueurs",
  "createLobby": "Créer le salon",
  "creatingLobby": "Le salon est en cours de création"
}
'
  ),
  (
    'fr-FR',
    'action-log',
    '{
  "game.update.playable_entity_turn_ended": "{{entityName}} a passé son tour.",
  "game.update.playable_entity_moved": "{{entityName}} s''est déplacé.",
  "game.update.door_opened": "{{entityName}} a ouvert une porte.",
  "game.update.playable_entity_turn_started": "{{entityName}} commence son tour.",
  "game.update.monster_spawned": "Un monstre est apparu. ($t(monsters:{{monsterRace}}))",
  "game.update.initiatives_rerolled": "Les jets d''initiative ont été relancés.",
  "game.update.playable_entity_died": "{{entityName}} est mort.",
  "game.update.playable_entity_attacked": "{{attackerEntityName}} attaque {{targetEntityName}} avec $t(items:{{attackItemUsedName}}) et inflige {{attackPower}} ({{diceScore}} + {{bonusScore}}) point(s) de dégât.",
  "game.update.playable_entity_took_damage": "{{entityName}} subit {{damageDone}} point(s) de dégât. {{entityHpLeft}} pv restant(s).",
  "game.status.win": "Victoire des héros !",
  "game.update.chest_trap_triggered": "{{subjectEntityName}} a déclenché un piège ! ($t(items:{{chestTrapName}}))",
  "game.update.trap_triggered": "{{subjectEntityName}} a marché sur un piège ! Son déplacement a été interrompu. ($t(items:trap.{{trapName}}) : $t(items:trap.{{trapName}}.description))"
}
'
  ),
  (
    'fr-FR',
    'perks',
    '{
  "once_per_attack": "Une fois par attaque",
  "special_dice": "Quand le jet spécial est réussi",
  "reroll_one_dice.description": "Le dé le plus faible est relancé",
  "reroll_all_dices.description": "Tous les dés sont relancés et additionnés",
  "critical_failure.description": "N''inflige aucun dégât",
  "mana_leech.description": "Restaure 1 point de mana",
  "breakable.description": "L''objet est détruit",
  "stop.description": "La cible passe son prochain tour",
  "frozen.description": "La cible est gelée et passe son prochain tour. N''affecte pas les morts-vivants",
  "greater_healing.description": "Restaure 1 point de vie supplémentaire",
  "ignore_armor_class.description": "Ignore la CA de la cible",
  "blood_price.description": "L''attaquant perd 1 point de vie",
  "turn_undead.description": "Renvoie la cible si c''est un mort-vivant",
  "double_damage.description": "Double l''attaque"
}
'
  ),
  (
    'fr-FR',
    'items',
    '{
  "trap.pit": "Fosse",
  "trap.pit.description": "Le héros perd 1 point de vie",
  "freeAction": "Action gratuite",
  "cannotCastSpell": "Vous ne pouvez pas lancer ce sort",
  "perUse": "par utilisation",
  "artifactSavingThrow": "50% de chances de perdre l''artefact après utilisation",
  "regular": "Attaque normale",
  "super": "Super attaque",
  "long": "À distance",
  "melee": "En mélée",
  "versatile": "À distance ou en mélée",
  "Artifact": "Artefact",
  "ChestTrap": "Piège",
  "Potion": "Potion",
  "Spell": "Sort",
  "Weapon": "Arme",
  "itemIdentity": "$t(items:{{type}}) NIVEAU {{level}}",
  "damageRange": "{{minDamage}} à {{maxDamage}} dégâts",
  "magic_shot_1": "Projectile magique",
  "magic_shot_1.description": "",
  "broadsword_1": "Épée large",
  "broadsword_1.description": "",
  "faith_crossbow_1": "Arbalète de la foi",
  "faith_crossbow_1.description": "",
  "throwing_dagger_1": "Dague de lancer équilibrée",
  "throwing_dagger_1.description": "",
  "elders_shortbow_1": "Arc court des anciens",
  "elders_shortbow_1.description": "",
  "goblin_scimitar_1": "Cimeterre gobelin",
  "goblin_scimitar_1.description": "",
  "bugbear_mace_1": "Masse de gobelours",
  "bugbear_mace_1.description": "",
  "faith_mace_1": "Masse d''arme de la foi",
  "faith_mace_1.description": "",
  "flash_bombs_1": "Bombes flash",
  "flash_bombs_1.description": "",
  "master_axe_1": "Hache du maître",
  "master_axe_1.description": "",
  "poisoned_blowpipe_1": "Sarbacane empoisonnée",
  "poisoned_blowpipe_1.description": "",
  "sword_of_outcast_kings_1": "Lame des rois proscrits",
  "sword_of_outcast_kings_1.description": "",
  "tormented_sword_of_slavery_1": "Épée tourmentée d''esclavage",
  "tormented_sword_of_slavery_1.description": "",
  "bow_of_freedom_1": "Arc de liberté",
  "bow_of_freedom_1.description": "",
  "elves_blessed_bow_1": "Arc béni des elfes",
  "elves_blessed_bow_1.description": "",
  "trusty_dwarven_forging_axe_1": "Fidèle hache de forge naine",
  "trusty_dwarven_forging_axe_1.description": "",
  "dragons_fury_1": "Furie du dragon",
  "dragons_fury_1.description": "",
  "kords_unsubmissive_servant_1": "Serviteur insoumis de Kord",
  "kords_unsubmissive_servant_1.description": "",
  "herald_of_pain_1": "Héraut de la douleur",
  "herald_of_pain_1.description": "",
  "two_handed_broadsword_1": "Épée large à deux mains",
  "two_handed_broadsword_1.description": "",
  "bone_splitter_1": "Fendoir à os",
  "bone_splitter_1.description": "",
  "hammer_of_freedom_1": "Marteau de liberté",
  "hammer_of_freedom_1.description": "",
  "pillar_of_fire_1": "Colonne de feu",
  "pillar_of_fire_1.description": "",
  "energy_shield_1": "Bouclier d''énergie",
  "energy_shield_1.description": "",
  "force_cage_1": "Cage de force",
  "force_cage_1.description": "",
  "ultimate_restauration_1": "Restauration suprême",
  "ultimate_restauration_1.description": "",
  "invisible_servant_1": "Serviteur invisible",
  "invisible_servant_1.description": "",
  "partial_healing_circle_1": "Cercle de guérison partielle",
  "partial_healing_circle_1.description": "",
  "call_from_the_grave_1": "Appel de la tombe",
  "call_from_the_grave_1.description": "Ranime le dernier Monstre vaincu et le place aléatoirement dans la pièce.",
  "voices_of_the_damned_1": "Voix des damnés",
  "voices_of_the_damned_1.description": "Déplace le Héros vers l''allié le plus proche et l''attaque avec l''arme équipée.",
  "dazzling_light_1": "Lumière aveuglante",
  "dazzling_light_1.description": "Passe le prochain tour du Héros.",
  "smothering_mist_1": "Brume étouffante",
  "smothering_mist_1.description": "Les créatures dans la pièce perdent 1 point de vie, sauf les morts-vivants.",
  "brutal_betrayal_1": "Trahison brutale",
  "brutal_betrayal_1.description": "",
  "magic_loss_1": "Perte de magie",
  "magic_loss_1.description": "",
  "blanket_of_flames_1": "Couverture de flammes",
  "blanket_of_flames_1.description": "",
  "ray_of_frost_1": "Rayon de givre",
  "ray_of_frost_1.description": "",
  "melfs_acid_arrow_1": "Flèche acide de Melf",
  "melfs_acid_arrow_1.description": "",
  "flaming_arrows_1": "Flèches enflammées",
  "flaming_arrows_1.description": "",
  "burning_hands_1": "Mains brûlantes",
  "burning_hands_1.description": "",
  "orb_of_lucid_vision_1": "Orbe de vision lucide",
  "orb_of_lucid_vision_1.description": "",
  "boccobs_cloak_1": "Cape de Boccob",
  "boccobs_cloak_1.description": "",
  "yonddalla_amulet_1": "Amulette de Yonddalla",
  "yonddalla_amulet_1.description": "",
  "ring_of_shadows_1": "Anneau des ombres",
  "ring_of_shadows_1.description": "",
  "summoners_horn_1": "Cor de l''invocateur",
  "summoners_horn_1.description": "",
  "bark_skin_cloak_1": "Cape en peau d''écorce",
  "bark_skin_cloak_1.description": "",
  "olidammara_amulet_1": "Amulette d''Olidammara",
  "olidammara_amulet_1.description": "",
  "potion_of_weakness_1": "Potion de faiblesse",
  "potion_of_weakness_1.description": "Réduit la CA d''un Monstre aléatoire à 0 jusqu''au début de son prochain tour.",
  "smoke_shadow_potion_1": "Potion d''ombre fumigène",
  "smoke_shadow_potion_1.description": "Double les points de mouvement de tous les Héros dans la pièce pour 1 tour.",
  "kords_blessing_potion_1": "Potion de bénédiction de Kord",
  "kords_blessing_potion_1.description": "Double la puissance de votre prochaine attaque à l''arme.",
  "imperious_hand_potion_1": "Potion de main impérieuse",
  "imperious_hand_potion_1.description": "Déplace un monstre aléatoire à un emplacement aléatoire dans sa pièce actuelle.",
  "potion_of_laughter_1": "Potion de fou rire",
  "potion_of_laughter_1.description": "Un Monstre choisi aléatoirement passe son prochain tour.",
  "olidammara_wisdom_potion_1": "Potion de la sagesse d''Olidammara",
  "olidammara_wisdom_potion_1.description": "Ignore les effets du prochain piège que vous déclencherez.",
  "partial_restoration_potion_1": "Potion de restauration partielle",
  "partial_restoration_potion_1.description": "Restaure un maximum de 3 points de sort.",
  "initiative_potion_1": "Potion d''initiative",
  "initiative_potion_1.description": "Échange l''initiative du Héros avec celle du prochain Monstre à jouer.",
  "ultimate_restoration_potion_1": "Potion de restauration suprême",
  "ultimate_restoration_potion_1.description": "Ranime un Héros adjacent avec un maximum de 4 points de vie et 4 points de sort.",
  "light_healing_potion_1": "Potion de soins légers",
  "light_healing_potion_1.description": "Restaure un maximum de 3 points de vie."
}
'
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
    'monsters',
    '{
  "goblin": "gobelin",
  "bugbear": "gobelours"
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
  "heroIdentity": "$t(heroes:{{class}}) NIVEAU {{level}}",
  "monsterIdentity": "{{kind}}"
}'
  );