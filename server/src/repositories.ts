import { AppDataSource } from "./data-source";
import { Application } from "./entities/application";
import { User } from "./entities/user";
import { Category } from "./entities/category";

export const applicationRepository = AppDataSource.getRepository(Application);
export const userRepository = AppDataSource.getRepository(User);
export const categoryRepository = AppDataSource.getRepository(Category);
