import pino, { StreamEntry } from 'pino';
import fs from 'fs';

const streams = [
  fs.createWriteStream(`${__dirname}/../../logs/logs.stream.out`),
  {
    level: 'error',
    stream: fs.createWriteStream(`${__dirname}/../../logs/error.stream.out`, {
      flags: 'a',
    }),
  },
] as StreamEntry[];

export const logger = pino(
  {
    level: 'info',
  },
  pino.multistream(streams)
);
