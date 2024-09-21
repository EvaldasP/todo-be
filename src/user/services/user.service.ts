import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User> {
    return this._userRepository.findOne({ where: { username } });
  }

  async createUser(createUserDto: any): Promise<string> {
    const { username, password } = createUserDto;

    const user = await this.findOneByUsername(username);

    if (user) {
      throw new UnauthorizedException('User already exists');
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
