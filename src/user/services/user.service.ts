import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dtos/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User> {
    return this._userRepository.findOne({ where: { username } });
  }

  async createUser({ username, password }: RegisterDto): Promise<string> {
    const user = await this.findOneByUsername(username);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this._userRepository.create({
      username: username,
      password: hashedPassword,
    });

    await this._userRepository.save(newUser);
    return newUser.username;
  }
}
