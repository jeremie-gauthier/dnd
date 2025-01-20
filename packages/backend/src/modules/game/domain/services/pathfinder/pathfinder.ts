import { BinaryHeap } from "./binary-heap";
import type { Coord } from "./interfaces/coord.interface";
import { Node } from "./node";

function reconstructPath<TData>(arrivalNode: Node<TData>) {
  const path: Array<Coord> = [];

  let current: Node<TData> | undefined = arrivalNode;
  while (current) {
    path.push(current.coord);
    current = current.parent;
  }
  path.reverse();
  return path;
}

/**
 *The type of function used to tell whether the goal node has been reached or not.
 *	@param node The node to evaluate.
 *	@param coord The coord of the node being evaluated.
 *	@template TData Represents a grid's Cell type.
 */
type GoalPredicate<TData> = (node: TData, coord: Coord) => boolean;

/**
 *	The A* heuristic.
 *	@param node The node to evaluate.
 *	@param coord The coord of the node being evaluated.
 *	@template TData Represents a grid's Cell type.
 */
type Heuristic<TData> = (node: TData, coord: Coord) => number;

/**
 * The optional options object.
 * @template TData Represents a grid's Cell type.
 */
type Options<TData> = {
  /**
   * The optional predicate to tell whether a cell is visitable by the algorithm or not.
   * @param node The node to evaluate.
   * @template TData Represents a grid's Cell type.
   */
  canVisitNode?: (node: TData) => boolean;
};

/**
 * A pathfinder algorithm implemented with A*.
 * @param grid The grid to work on represented as a 2D-array.
 * @param startCoord The starting coordinate for the algorithm.
 * @param hasReachGoal The predicate that tells whether the goal node has been reached or not.
 * @param heuristic The A* heuristic.
 * @param options Options to customize the A* algorithm.
 * @template TData Represents a grid's Cell type.
 * @link https://en.wikipedia.org/wiki/A*_search_algorithm
 */
export function pathfinder<TData>({
  grid,
  startCoord,
  hasReachGoal,
  heuristic,
  options,
}: {
  grid: Array<Array<TData>>;
  startCoord: Coord;
  hasReachGoal: GoalPredicate<TData>;
  heuristic: Heuristic<TData>;
  options?: Options<TData>;
}) {
  const openSet = new BinaryHeap<Node<TData>>(
    (a, b) => a.heuristic - b.heuristic,
  );
  const startNode = new Node(startCoord, grid, 0, 0);
  openSet.insert(startNode);

  const closedSet = new Set<Node["id"]>([startNode.id]);

  let current = openSet.extract();
  while (current) {
    if (hasReachGoal(current.data, current.coord)) {
      const path = reconstructPath(current);
      return path;
    }

    const neighbourNodes = current.getNeighbourNodes();
    for (const neighbourNode of neighbourNodes) {
      // neighbour node has already been visited
      if (closedSet.has(neighbourNode.id)) continue;

      if (options?.canVisitNode && !options.canVisitNode(neighbourNode.data)) {
        continue;
      }

      neighbourNode.heuristic =
        neighbourNode.cost + heuristic(neighbourNode.data, neighbourNode.coord);

      const neighbourNodeInOpenSet = openSet.search(neighbourNode.id);
      // neighbour node is not planed to be visited yet
      if (!neighbourNodeInOpenSet) {
        openSet.insert(neighbourNode);
      }
      // neighbour node is planed to be visited via a worse path
      else if (neighbourNodeInOpenSet.heuristic > neighbourNode.heuristic) {
        // we record this better path we just found
        openSet.decreaseElement(neighbourNode);
      }
    }

    closedSet.add(current.id);
    current = openSet.extract();
  }
}
