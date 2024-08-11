import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TodoStatusDto } from '../dtos/todo-status.dto';
import { TodoDto } from '../dtos/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly _todoRepository: Repository<Todo>,
  ) {}

  public createTodo(todoDto: TodoDto, user: User): Promise<Todo> {
    const todo = this._todoRepository.create({
      ...todoDto,
      user,
    });

    return this._todoRepository.save(todo);
  }

  public updateTodo(id: number, user: User, todoDto: TodoDto): Promise<Todo> {
    return this.updateTodoFields(id, user, todoDto);
  }

  public updateTodoStatus(
    id: number,
    user: User,
    todoStatusDto: TodoStatusDto,
  ): Promise<Todo> {
    return this.updateTodoFields(id, user, todoStatusDto);
  }

  public findAllUserTodos(user: User): Promise<Todo[]> {
    return this._todoRepository.find({ where: { user } });
  }

  public async deleteTodo(id: number, user: User): Promise<number> {
    const result = await this._todoRepository.delete({ id, user });

    if (!result?.affected) {
      throw new NotFoundException('Todo not found. Failed to delete');
    }

    return id;
  }

  private async findTodo(id: number, user: User): Promise<Todo> {
    const todo = await this._todoRepository.findOne({
      where: { id, user },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  private async updateTodoFields(
    id: number,
    user: User,
    updateData: Partial<Todo>,
  ): Promise<Todo> {
    const todo = await this.findTodo(id, user);

    Object.assign(todo, updateData);

    return this._todoRepository.save(todo);
  }
}
