import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './services/todo.service';
import { TodoDto } from './dtos/todo.dto';
import { TodoStatusDto } from './dtos/todo-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/shared/decorators/user.decorator';

@Controller('todos')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class TodoController {
  constructor(private readonly _todoService: TodoService) {}

  @Get()
  findAllTodos(@GetUser() user: User): Promise<Todo[]> {
    return this._todoService.findAllUserTodos(user);
  }

  @Post()
  createTodo(
    @GetUser() user: User,
    @Body() createTodoDto: TodoDto,
  ): Promise<Todo> {
    return this._todoService.createTodo(createTodoDto, user);
  }

  @Patch(':id')
  updateTodo(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() todoDto: TodoDto,
  ): Promise<Todo> {
    return this._todoService.updateTodo(id, user, todoDto);
  }

  @Patch(':id')
  updateTodoStatus(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() todoStatusDto: TodoStatusDto,
  ): Promise<Todo> {
    return this._todoService.updateTodoStatus(id, user, todoStatusDto);
  }

  @Delete(':id')
  deleteTodo(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<number> {
    return this._todoService.deleteTodo(id, user);
  }
}
