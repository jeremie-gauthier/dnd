import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EnemyTemplate } from "src/database/entities/enemy-template.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class PlayableEntityRepository {
  constructor(
    @InjectRepository(EnemyTemplate)
    private readonly enemyTemplateRepository: Repository<EnemyTemplate>,
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
}
