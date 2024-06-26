export class Coord {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  public static from({ x, y }: { x: number; y: number }) {
    return new Coord(x, y);
  }

  public equals({ x, y }: Coord): boolean {
    return this.x === x && this.y === y;
  }

  public isNextTo({ x, y }: Coord) {
    const diffX = Math.abs(this.x - x);
    const diffY = Math.abs(this.y - y);
    const diff = diffX + diffY;
    return diff === 1;
  }

  public getNeighbourCoords(): [Coord, Coord, Coord, Coord] {
    return [
      Coord.from({ x: this.x - 1, y: this.y }),
      Coord.from({ x: this.x + 1, y: this.y }),
      Coord.from({ x: this.x, y: this.y - 1 }),
      Coord.from({ x: this.x, y: this.y + 1 }),
    ];
  }
}
