import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item as ItemDomain } from "src/modules/game/domain/item/item.abstract";
import { Mapper } from "src/modules/shared/infra/mapper";
import { DeepPartial, Repository } from "typeorm";
import { Artifact as ArtifactPersistence } from "../entities/item/artifact.entity";
import { Spell as SpellPersistence } from "../entities/item/attack-item/spell/spell.entity";
import { Weapon as WeaponPersistence } from "../entities/item/attack-item/weapon.entity";
import { ChestTrap as ChestTrapPersistence } from "../entities/item/chest-trap.entity";
import { Potion as PotionPersistence } from "../entities/item/potion.entity";
import { ItemType } from "../enums/item-type.enum";
import { ItemPersistence } from "../interfaces/item-persistence.interface";
import { ItemFactory } from "./factories/item.factory";

@Injectable()
export class ItemMapper extends Mapper<ItemPersistence, ItemDomain> {
  constructor(
    @InjectRepository(WeaponPersistence)
    private readonly weaponRepository: Repository<WeaponPersistence>,
    @InjectRepository(SpellPersistence)
    private readonly spellRepository: Repository<SpellPersistence>,
    @InjectRepository(ChestTrapPersistence)
    private readonly chestTrapRepository: Repository<ChestTrapPersistence>,
    @InjectRepository(PotionPersistence)
    private readonly potionRepository: Repository<PotionPersistence>,
    @InjectRepository(ArtifactPersistence)
    private readonly artifactRepository: Repository<ArtifactPersistence>,
  ) {
    super();
  }

  public override toDomain(persistence: ItemPersistence): ItemDomain {
    return ItemFactory.create(persistence);
  }

  // TODO: check that it works
  public toPersistence(domain: ItemDomain): ItemPersistence {
    switch (domain.type) {
      case ItemType.WEAPON:
        return this.weaponRepository.create(
          domain as DeepPartial<WeaponPersistence>,
        );
      case ItemType.SPELL:
        return this.spellRepository.create(
          domain as DeepPartial<SpellPersistence>,
        );
      case ItemType.CHESTTRAP:
        return this.chestTrapRepository.create(
          domain as DeepPartial<ChestTrapPersistence>,
        );
      case ItemType.POTION:
        return this.potionRepository.create(
          domain as DeepPartial<PotionPersistence>,
        );
      case ItemType.ARTIFACT:
        return this.artifactRepository.create(
          domain as DeepPartial<ArtifactPersistence>,
        );
    }
  }
}
