import { GameView } from "@dnd/shared";

type GameBoard = GameView["map"];

export interface GameBoardDeserialized extends GameBoard {}
