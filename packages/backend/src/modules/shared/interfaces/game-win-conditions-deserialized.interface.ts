import { MapCompiledJson } from "@dnd/shared";

type WinConditions = MapCompiledJson["winConditions"];

export interface GameWinConditionsDeserialized extends WinConditions {}
