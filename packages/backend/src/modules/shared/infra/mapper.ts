export abstract class Mapper<EntityPersistence, EntityDomain> {
  public abstract toDomain(raw: EntityPersistence): EntityDomain;
  public abstract toPersistence(domain: EntityDomain): EntityPersistence;
}
