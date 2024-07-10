import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiceUI as DiceUIPersistence } from "src/database/entities/dice-ui.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostgresDiceUIRepository {
  constructor(
    @InjectRepository(DiceUIPersistence)
    private readonly repository: Repository<DiceUIPersistence>,
  ) {}

  public async getOneOrThrow({
    name,
  }: { name: string }): Promise<DiceUIPersistence> {
    const dice = await this.repository.findOne({
      select: {
        diceName: true,
        color: true,
      },
      where: {
        dice: {
          name,
        },
      },
    });

    if (!dice) {
      throw new NotFoundException("DiceUI not found");
    }

    return dice;
  }
}
