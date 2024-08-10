import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';
import { TodoService } from './services/todo.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [],
})
export class TodoModule {}
