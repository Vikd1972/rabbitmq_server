import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';

import config from '../config';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.base,
  logging: config.db.logging,
  synchronize: false,
  subscribers: [],
  migrationsTableName: 'typeorm_migrations',
  entities: [path.normalize(`${__dirname}/entities/*.{ts,js}`)],
  migrations: [path.normalize(`${__dirname}/migrations/*.{ts,js}`)],
});

export default dataSource;
