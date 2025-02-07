import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiceRepository } from "src/modules/game/application/repositories/dice-repository.interface";
import { Dice as DiceDomain } from "src/modules/game/domain/dice/dice.vo";
import { Repository } from "typeorm";
import { Dice as DicePersistence } from "../entities/item/dice.entity";
import { DiceMapper } from "../mappers/dice.mapper";

@Injectable()
export class DicePostgresRepository implements DiceRepository {
  constructor(
    @InjectRepository(DicePersistence)
    private readonly repository: Repository<DicePersistence>,
    private readonly mapper: DiceMapper,
  ) {}

  public async getOneOrThrow({ name }: { name: string }): Promise<DiceDomain> {
    const dice = await this.repository.findOne({
      select: {
        name: true,
        values: true,
      },
      where: {
        name,
      },
    });

    if (!dice) {
      throw new NotFoundException("Dice not found");
    }

    return this.mapper.toDomain(dice);
  }

  public async getAll(): Promise<Array<DiceDomain>> {
    const dices = await this.repository.find();
    return dices.map((dice) => this.mapper.toDomain(dice));
  }

  public async getAllRaw(): Promise<Array<DicePersistence>> {
    const dices = await this.repository.find();
    return dices;
  }
}
