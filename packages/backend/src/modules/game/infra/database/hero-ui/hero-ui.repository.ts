import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HeroUI as HeroUIPersistence } from "src/database/entities/hero-ui.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostgresHeroUIRepository {
  constructor(
    @InjectRepository(HeroUIPersistence)
    private readonly heroUIRepository: Repository<HeroUIPersistence>,
  ) {}

  public async getOneOrThrow({
    name,
  }: { name: string }): Promise<HeroUIPersistence> {
    return this.heroUIRepository.findOneOrFail({
      select: { imgUrl: true },
      where: {
        name,
      },
      cache: true,
    });
  }
}
