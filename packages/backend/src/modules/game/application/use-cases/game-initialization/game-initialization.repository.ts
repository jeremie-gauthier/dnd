import type { GameEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Dice } from "src/database/entities/dice.entity";
import { Item } from "src/database/entities/item.entity";
import { Spell } from "src/database/entities/spell.entity";
import { Weapon } from "src/database/entities/weapon.entity";
import { In, type Repository } from "typeorm";
import { GamesRepository } from "../../../infra/database/games.repository";

@Injectable()
export class GameInitializationRepository {
  constructor(
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
    @InjectRepository(Spell)
    private readonly spellRepository: Repository<Spell>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Dice)
    private readonly diceRepository: Repository<Dice>,
    private readonly gamesRepository: GamesRepository,
  ) {}

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
