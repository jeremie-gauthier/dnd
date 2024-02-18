# Compiled Map File Format

The first line should describle the shape of the map (its width and height), in the following form:

```txt
<width>;<height>
```

So, the following would describe a map of 4 tiles width by 5 tiles height:

```txt
4;5
```

The following lines described entities on the map.
Each entity is declared by by its x, y coordinates on the map, followed by its name.
As in the following example:

```txt
<width>;<height>
<x>,<y>;<entity_tag>
```

So, the following would describe a map of 2 tiles width by 2 tiles height with a tree on the top right corner:

```txt
2;2
0,1;tree
```
