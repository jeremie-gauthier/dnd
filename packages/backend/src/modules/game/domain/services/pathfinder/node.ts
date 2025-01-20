import type { Coord } from "./interfaces/coord.interface";

export class Node<TData = unknown> {
  public readonly id: number;
  public readonly data: TData;

  constructor(
    public readonly coord: Coord,
    private readonly grid: Array<Array<TData>>,
    public cost: number,
    public heuristic: number,
    public parent?: Node<TData>,
  ) {
    const width = grid[0]?.length ?? 0;
    this.id = coord.row * width + coord.column;
    this.data = grid[coord.row]![coord.column]!;
  }

  public getNeighbourNodes() {
    return [
      { row: this.coord.row - 1, column: this.coord.column },
      { row: this.coord.row, column: this.coord.column + 1 },
      { row: this.coord.row + 1, column: this.coord.column },
      { row: this.coord.row, column: this.coord.column - 1 },
    ]
      .map((neighbouringCoord) => {
        const neighbour =
          this.grid[neighbouringCoord.row]?.[neighbouringCoord.column];
        return neighbour !== undefined
          ? new Node(
              neighbouringCoord,
              this.grid,
              this.cost + 1,
              Number.POSITIVE_INFINITY,
              this,
            )
          : undefined;
      })
      .filter((neighbour) => neighbour !== undefined);
  }
}
