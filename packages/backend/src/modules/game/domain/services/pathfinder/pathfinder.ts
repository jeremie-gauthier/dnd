import { BinaryHeap } from "./binary-heap";
import type { Coord } from "./interfaces/coord.interface";

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
 *  The type of function used to tell whether the goal node has been reached or not.
 *	@param coord The coord of the node being evaluated.
 */
type GoalPredicate = (coord: Coord) => boolean;

/**
 *	The callback used to get neighbours of a node.
 *	@param coord The coord of the node being evaluated.
 */
type GetNeighbours = (coord: Coord) => Array<Coord>;

/**
 *	The callback used to get the unique identifier of a node.
 *	@param coord The coord of the node being evaluated.
 */
type GetIdentifier = (coord: Coord) => string | number;

/**
 *	The A* heuristic.
 *	@param coord The coord of the node being evaluated.
 */
type Heuristic = (coord: Coord) => number;

/**
 *	The callback used to get the unique identifier of a node.
 *	@template TData Represents a grid's Cell type.
 */
type Node<TData> = {
  id: ReturnType<GetIdentifier>;
  coord: Coord;
  cost: number;
  heuristic: number;
  parent?: Node<TData>;
};

/**
 * A pathfinder algorithm implemented using A*.
 * @param {object} params - The parameters for the A* algorithm.
 * @param {Coord} params.startCoord The starting coordinate for the algorithm.
 * @param {GoalPredicate} params.hasReachGoal The predicate that tells whether the goal node has been reached or not.
 * @param {GetNeighbours} params.getNeighbours The callback used to get neighbours of a node.
 * @param {GetIdentifier} params.getIdentifier The callback used to get the unique identifier of a node.
 * @param {Heuristic} params.heuristic The A* heuristic.
 * @template TData Represents a grid's Cell type.
 * @link https://en.wikipedia.org/wiki/A*_search_algorithm
 */
export function pathfinder<TData>({
  startCoord,
  hasReachGoal,
  getNeighbours,
  getIdentifier,
  heuristic,
}: {
  startCoord: Coord;
  hasReachGoal: GoalPredicate;
  getNeighbours: GetNeighbours;
  getIdentifier: GetIdentifier;
  heuristic: Heuristic;
}) {
  const openSet = new BinaryHeap<Node<TData>>(
    (a, b) => a.heuristic - b.heuristic,
  );
  const startNode: Node<TData> = {
    id: getIdentifier(startCoord),
    coord: startCoord,
    cost: 0,
    heuristic: 0,
  };
  openSet.insert(startNode);

  const closedSet = new Set<Node<TData>["id"]>([startNode.id]);

  let current = openSet.extract();
  while (current) {
    if (hasReachGoal(current.coord)) {
      const path = reconstructPath(current);
      return path;
    }

    const neighbourCost = current.cost + 1;
    const neighbourCoords = getNeighbours(current.coord);
    for (const neighbourCoord of neighbourCoords) {
      const neighbourNodeId = getIdentifier(neighbourCoord);
      // neighbour node has already been visited
      if (closedSet.has(neighbourNodeId)) continue;

      const neighbourNode: Node<TData> = {
        id: neighbourNodeId,
        coord: neighbourCoord,
        cost: neighbourCost,
        heuristic: neighbourCost + heuristic(neighbourCoord),
        parent: current,
      };

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
