export abstract class Mapper<TEntityPersistence, TEntityDomain> {
  public abstract toDomain(persistence: TEntityPersistence): TEntityDomain;
  public abstract toPersistence(domain: TEntityDomain): TEntityPersistence;
}
