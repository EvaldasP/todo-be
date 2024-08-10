import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Todo } from './todo/entities/todo.entity';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/db/todo-database.sqlite',
      entities: [User, Todo],
      synchronize: true,
    }),
    TodoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
