import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      dirname: 'logs',
    }),
    new winston.transports.File({ filename: 'all.log', dirname: 'logs' }),
  ],
});
