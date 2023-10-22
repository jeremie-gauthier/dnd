import { Map } from './map/map';
import { MapParser } from './map/parser/map-parser';
import { MapReader } from './map/parser/map-reader';

const mapReader = new MapReader('../resources/maps/chunk1.txt');
const mapParser = new MapParser(mapReader);
mapParser
  .run()
  .then(([width, height, tiles]) => {
    const map = new Map(width, height, tiles);
    console.log(map.toString());
  })
  .catch((error) => {
    console.error('ERROR', error);
  });
