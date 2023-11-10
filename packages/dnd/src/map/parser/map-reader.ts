import fs from 'node:fs';
import readline from 'node:readline/promises';

export class MapReader {
  public readonly HEADER_METADATA_LINE = 1;
  public readonly MAP_DATA_STARTING_LINE = 2;

  private readonly readStream: fs.ReadStream;

  constructor(filePath: string) {
    this.readStream = fs.createReadStream(filePath);
  }

  public async *readLines(): AsyncGenerator<[string, number], void> {
    const rl = readline.createInterface({
      input: this.readStream,
      crlfDelay: Number.POSITIVE_INFINITY,
    });

    let lineIndex = 1;
    for await (const line of rl) {
      yield [line, lineIndex];
      lineIndex += 1;
    }

    rl.close();
  }
}
