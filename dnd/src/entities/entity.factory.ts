import { Trap } from './interactives/trap.entity';
import { Tree } from './non-interactives/tree.entity';

type EntityFactoryMapper = (typeof EntityFactory)['entitiesByType'];
type EntitiesTypes = keyof EntityFactoryMapper;
type Entities = EntityFactoryMapper[EntitiesTypes];

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class EntityFactory {
  public static entitiesByType = {
    tree: Tree,
    trap: Trap,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static create(type: string) {
    const entity = EntityFactory.entitiesByType[type as EntitiesTypes] as
      | Entities
      | undefined;
    if (!entity) {
      throw new Error(`Cannot instantiate entity type "${type}"`);
    }

    return new entity();
  }
}
