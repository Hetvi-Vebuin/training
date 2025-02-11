import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/user";
import "dotenv/config";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/infrastructure/helpers/orm/typeorm/entities/*{.ts,.js}"],
  // migrationsTableName: "migration_table",
  // migrations: ["src/migration/*.ts"],
  subscribers: [],
  synchronize: false,
  logging: true,
});
