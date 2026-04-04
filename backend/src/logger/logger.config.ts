import { mkdirSync } from 'fs';
import { join } from 'path';
import pino from 'pino';

const logsDir = join(process.cwd(), 'storage', 'logs');
mkdirSync(logsDir, { recursive: true });

const fileTransport = pino.transport({
  target: 'pino-roll',
  level: 'error',
  options: {
    file: join(logsDir, 'app'),
    frequency: 'daily',
    extension: '.log',
    dateFormat: 'yyyy-MM-dd',
    mkdir: true,
    size: '10m',
    limit: { count: 30 },
    sync: false,
  },
});

const consoleLevel =
  process.env.NODE_ENV === 'production' ? 'info' : 'debug';

export const pinoStreams = pino.multistream([
  {
    level: consoleLevel,
    stream:
      process.env.NODE_ENV !== 'production'
        ? pino.transport({
            target: 'pino-pretty',
            options: { colorize: true, translateTime: 'SYS:standard' },
          })
        : process.stdout,
  },
  {
    level: 'error',
    stream: fileTransport,
  },
]);
