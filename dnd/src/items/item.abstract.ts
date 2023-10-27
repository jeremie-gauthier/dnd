export abstract class Item {
  abstract readonly name: string;
  abstract readonly type: 'weapon' | 'artifact' | 'spell';
}
