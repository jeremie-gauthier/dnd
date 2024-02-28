# Compiled Map File Format

## 1. Map's dimension

The first line must describe the shape of the map (its width (=max nb of columns) and height (max nb of rows)), in the following form:

```txt
<height>;<width>
```

or in other terms:

```txt
<max_nb_of_rows>;<max_nb_of_columns>
```

So, the following would describe a map of 4 tiles width by 5 tiles height:

```txt
4;5
```

## 2. Starting positions

The second line must describe all the starting positions for this map, in the following form:

```txt
<row>,<column>[;<row>,<column>...]
```

So the following describe 3 different starting positions:

```txt
4;5
0,0;2,3;4,4
```

## 3. Entities

The following lines must describe entities on the map.
Each entity is declared by by its (row, column) coordinates on the map, followed by its name.
As in the following example:

```txt
<row>,<column>;<entity_tag>
```

So, the following would describe a map of 2 tiles width by 2 tiles height with a tree on the top right corner:

```txt
2;2
0,0
0,1;tree
```
