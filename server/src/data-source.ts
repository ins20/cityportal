import { DataSource } from "typeorm";
import { Application } from "./entities/application";
import { User } from "./entities/user";
import { Category } from "./entities/category";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "postgres",
  entities: [User, Application, Category],
  synchronize: true,
  logging: false,
});
