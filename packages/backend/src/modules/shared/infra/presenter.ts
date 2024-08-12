export abstract class Presenter<TEntityView, TEntityDomain> {
  public abstract toView(domain: TEntityDomain): Promise<TEntityView>;
}
