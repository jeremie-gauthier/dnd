import { MapCompiledJson } from "@dnd/shared";

type Rooms = MapCompiledJson["rooms"];

export interface GameRoomsDeserialized extends Rooms {}
