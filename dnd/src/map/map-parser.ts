/**
 * - Un mur doit etre dessine entre les cases `blocked` adjacentes aux cases non-`blocked`
 * - 4 distinctions de cases:
 * 		- blocked
 * 		- free
 * 		- interactive (qui est une sorte de `free` car on peut marcher dessus)
 * 		- non-interactive (qui est une sorte de `blocked` car on ne peut pas marcher dessus)
 * - fichier de map se compose de la facon suivante:
 * 		chaque ligne decrit une case, les differentes infos de la cases sont separees par des points-virgules:
 * 			<free|blocked>;<liste des cases connectees separees par des virgules>;<entity type>
 * 		ex:
 * 			free;9,19;chest
 * 			blocked;;
 * 			blocked;;pillar
 * 			free;9,19,21,31;
 */

import events from 'node:events';
import fs from 'node:fs';
import readline from 'node:readline/promises';

// class MapParser {
//   constructor() {

// 	}
// }

export async function parseFile(filePath: string) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Number.POSITIVE_INFINITY,
  });

  const tiles = Array.from({ length: 121 });

  rl.on('line', (line) => {
    console.log(line);
    tiles;
  });

  await events.once(rl, 'close');
}
