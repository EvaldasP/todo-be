import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Todo } from './entities/todo.entity';
import { TodoService } from './services/todo.service';
import { TodoDto } from './dtos/todo.dto';
import { TodoStatusDto } from './dtos/todo-status.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly _todoService: TodoService) {}

  @Get()
  async findAllTodos(): Promise<Todo[]> {
    return this._todoService.findAllUserTodos({} as any);
  }

  @Post()
  async createTodo(@Body() createTodoDto: TodoDto): Promise<Todo> {
    return this._todoService.createTodo(createTodoDto, {} as any);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() todoDto: TodoDto,
  ): Promise<Todo> {
    return this._todoService.updateTodo(id, {} as any, todoDto);
  }

  @Patch(':id')
  async updateTodoStatus(
    @Param('id') id: string,
    @Body() todoStatusDto: TodoStatusDto,
  ): Promise<Todo> {
    return this._todoService.updateTodoStatus(id, {} as any, todoStatusDto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<string> {
    return this._todoService.deleteTodo(id, {} as any);
  }
}
