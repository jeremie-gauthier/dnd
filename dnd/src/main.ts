import { MapChunk } from './map/map-chunk';
import { parseFile } from './map/map-parser';

function generateMapChunk1() {
  const mapChunk = new MapChunk();
  return mapChunk;
}

const mapChunk1 = generateMapChunk1();
console.log(mapChunk1);

parseFile('./resources/maps/chunk1.txt')
  .then(() => {
    console.log('END');
  })
  .catch((error) => {
    console.error('ERROR', error);
  });

//  parseFile('./resources/maps/chunk1.txt');
