# Compiled Map File Format

## 1. Map's dimension

The first line must describe the shape of the map (its width and height), in the following form:

```txt
<width>;<height>
```

So, the following would describe a map of 4 tiles width by 5 tiles height:

```txt
4;5
```

## 2. Starting positions

The second line must describe all the starting positions for this map, in the following form:

```txt
<x>,<y>[;<x>,<y>...]
```

So the following describe 3 different starting positions:

```txt
4;5
0,0;2,3;4,4
```

## 3. Entities

The following lines must describe entities on the map.
Each entity is declared by by its x, y coordinates on the map, followed by its name.
As in the following example:

```txt
<x>,<y>;<entity_tag>
```

So, the following would describe a map of 2 tiles width by 2 tiles height with a tree on the top right corner:

```txt
2;2
0,0
0,1;tree
```
