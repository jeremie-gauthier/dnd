import type { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import type { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Dice } from "src/database/entities/dice.entity";
import { EnemyTemplate } from "src/database/entities/enemy-template.entity";
import { Item } from "src/database/entities/item.entity";
import { Spell } from "src/database/entities/spell.entity";
import type { User } from "src/database/entities/user.entity";
import { Weapon } from "src/database/entities/weapon.entity";
import { GamesRepository } from "src/redis/repositories/games.repository";
import { In, type Repository } from "typeorm";

@Injectable()
export class GameInitializationRepository {
  constructor(
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
    @InjectRepository(Spell)
    private readonly spellRepository: Repository<Spell>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(CampaignStageProgression)
    private readonly campaignStageProgressionRepository: Repository<CampaignStageProgression>,
    @InjectRepository(Dice)
    private readonly diceRepository: Repository<Dice>,
    @InjectRepository(EnemyTemplate)
    private readonly enemyTemplateRepository: Repository<EnemyTemplate>,
    private readonly gamesRepository: GamesRepository,
  ) {}

  public async getEnemiesByNames({
    enemiesName,
  }: {
    enemiesName: EnemyTemplate["name"][];
  }): Promise<EnemyTemplate[]> {
    return this.enemyTemplateRepository.find({
      where: {
        name: In(enemiesName),
      },
    });
  }

  public async getUserCampaignStageProgression({
    campaignStageId,
    userId,
  }: {
    campaignStageId: CampaignStage["id"];
    userId: User["id"];
  }): Promise<CampaignStageProgression> {
    return await this.campaignStageProgressionRepository.findOneOrFail({
      where: {
        stage: {
          id: campaignStageId,
        },
        campaignProgression: {
          user: {
            id: userId,
          },
        },
      },
      relations: {
        stage: {
          campaign: true,
        },
        campaignProgression: {
          heroes: {
            inventory: {
              stuff: {
                item: true,
              },
            },
          },
        },
      },
    });
  }

  public async getItemAttributes({
    itemName,
  }: { itemName: Item["name"] }): Promise<Item> {
    const item = await this.itemRepository.findOneOrFail({
      select: { type: true },
      where: { name: itemName },
    });

    switch (item.type) {
      case "Weapon":
        return this.weaponRepository.findOneOrFail({
          where: { name: itemName },
          relations: { attacks: { attackDices: { dice: true } }, perks: true },
        });
      case "Spell":
        return this.spellRepository.findOneOrFail({
          where: { name: itemName },
          relations: { attacks: { attackDices: { dice: true } }, perks: true },
        });
    }
  }

  public async saveGame(game: GameEntity): Promise<GameEntity> {
    return await this.gamesRepository.set(game);
  }

  public getDicesByNames({
    diceNames,
  }: { diceNames: Dice["name"][] }): Promise<Dice[]> {
    return this.diceRepository.find({
      where: {
        name: In(diceNames),
      },
    });
  }
}
