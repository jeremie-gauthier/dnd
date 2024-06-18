export abstract class Mapper<EntityPersistence, EntityDomain, EntityView> {
  public abstract toDomain(raw: EntityPersistence): EntityDomain;
  public abstract toPersistence(domain: EntityDomain): EntityPersistence;
  public abstract toView(domain: EntityPersistence): EntityView;
}
