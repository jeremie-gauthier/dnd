import { Map } from './map/map';
import { MapParser } from './map/map-parser';
import { MapReader } from './map/map-reader';

const mapReader = new MapReader('../resources/maps/chunk1.txt');
const mapParser = new MapParser(mapReader);
mapParser
  .run()
  .then((result) => {
    const map = new Map(...result);
    console.log(map.toString());
  })
  .catch((error) => {
    console.error('ERROR', error);
  });
