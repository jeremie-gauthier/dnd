# Compiled Map File Format

The format used to describe a compiled map is JSON.

Here is a full example of a map compiled, check the sections below for more informations:

```json
{
  "height": 1,
  "width": 2,
  "startingPositions": [
    { "row": 0, "column": 1 }
  ],
  "entities": [
    { "row": 0, "column": 0, "kind": "wall" }
  ],
  "events": [
    { 
      "type": "on_door_opening",
      "data": {
        "doorCoord": { "row": 2, "column": 1 },
        "action": "spawn_enemies", 
        "enemies": ["goblin", "goblin", "skeleton"], 
        "startingTiles": [
          { "row": 3, "column": 0 },
          { "row": 3, "column": 1 }, 
          { "row": 3, "column": 2 }, 
          { "row": 3, "column": 3 }
        ] 
      }
    }
  ]
}
```

## 1. Map's dimension

They are defined in the `height` and `width` keys:

```ts
{
  height: number; // the nb of rows
  width: number; // the nb of columns
}
```

## 2. Starting positions

They are defined in the `startingPositions` key, which is an array of `Coord`:

```ts
  startingPositions: Array<{ 
    row: number;
    column: number;
  }>;
```

## 3. Entities

They are defined in the `entities` key, which is an array of objects like the following:

```ts
  entities: Array<{ 
    row: number;
    column: number;
    kind: 'wall' | 'door' | 'trap' | 'pillar' | ...
  }>;
```

## 4. Events

They are defined in the `events` key, which is an array of objects like the following:

```ts
  events: Array<{ 
    type: string;
    data: Record<string, any>;
  }>;
```
