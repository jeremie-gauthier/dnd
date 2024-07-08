import { GameEntity } from "@dnd/shared";

type GameBoard = GameEntity["map"];

export interface GameBoardDeserialized extends GameBoard {}
