import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
type ConfigPerEnv = {
  [key in
    | 'production'
    | 'development'
    | 'test']: Partial<DataSourceOptions>;
};

const eachEnvConfig: ConfigPerEnv = {
  development: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false
  },
  production: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    synchronize: true,
    database: process.env.DATABASE_NAME
  },
  test: {
    type: 'sqlite',
    database: process.env.DATABASE_NAME || "local.db",
    synchronize: true
  },
};

const commonConfig: Partial<DataSourceOptions> = {
  synchronize: false,
  migrationsTableName: 'migrations',
  maxQueryExecutionTime: 10240,
  timezone: process.env.TYPEORM_TIMEZONE || 'local',
  pool: {
    max: 512,
  },
  poolSize: 256,
  migrations: [join(__dirname, '..', 'migrations/**/*{.ts,.js}')],
  entities: [join(__dirname, '../modules', '**/*.entity{.ts,.js}')],
  subscribers: [join(__dirname, '../modules', '**/*.subscriber{.ts,.js}')],
  extra: {
    connectionLimit: 512,
  },
};
export const config: Partial<DataSourceOptions> = {
  ...commonConfig,
  ...eachEnvConfig[process.env['NODE_ENV'] || 'test'],
};
