import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/db/todo-database.sqlite',
  migrations: ['dist/db/migration/*.js'],
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
});
