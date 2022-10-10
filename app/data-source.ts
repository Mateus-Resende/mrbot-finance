import "reflect-metadata"
import { DataSource } from "typeorm"
import { User, Category, Transaction, Account } from "./entities"

console.log(process.env.DB_USERNAME);
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Account, Category, Transaction, User],
    migrations: [],
    subscribers: [],
})
