import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'todo-database.sqlite',
  migrations: ['dist/db/migration/*.js'],
});
