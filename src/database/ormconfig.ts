import { ConnectionOptions } from 'typeorm';
import config from '../common/config';
import { Board } from '../resources/boards/boards.model';
import { BoardColumn } from '../resources/columns/columns.model';
import { Task } from '../resources/tasks/tasks.model';
import { User } from '../resources/users/users.model';

const {
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_DATABASE,
  TYPEORM_PASSWORD,
  TYPEORM_USERNAME,
  TYPEORM_CONNECTION,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_MIGRATIONS_DIR,
  TYPEORM_MIGRATIONS,
} = config;

export default {
  database: TYPEORM_DATABASE,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  type: TYPEORM_CONNECTION,
  host: TYPEORM_HOST,
  port: TYPEORM_PORT,
  synchronize: TYPEORM_SYNCHRONIZE,
  entities: [User, Task, BoardColumn, Board],
  migrations: [`${TYPEORM_MIGRATIONS}`],
  cli: {
    migrationsDir: `${TYPEORM_MIGRATIONS_DIR}`,
  },
} as ConnectionOptions;
