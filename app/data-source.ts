import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/entities/*.entity.{js,ts}'],
  migrations: [],
  subscribers: [],
});

const TestDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'mrbot-finance-test',
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/entities/*.entity.{js,ts}'],
  migrations: [],
  subscribers: [],
});

export { AppDataSource, TestDataSource };
