import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// import { Dice as DicePersistence } from "src/database/entities/dice.entity";
import { Dice as DiceDomain } from "src/modules/game/domain/dice/dice.vo";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Repository } from "typeorm";
import { Dice as DicePersistence } from "../entities/item/dice.entity";

@Injectable()
export class DiceMapper extends Mapper<DicePersistence, DiceDomain> {
  constructor(
    @InjectRepository(DicePersistence)
    private readonly repository: Repository<DicePersistence>,
  ) {
    super();
  }

  public override toDomain(persistence: DicePersistence): DiceDomain {
    return new DiceDomain({
      name: persistence.name,
      values: persistence.values,
    });
  }

  public toPersistence(domain: DiceDomain): DicePersistence {
    return this.repository.create({
      name: domain.name,
      values: domain.values,
    });
  }
}
