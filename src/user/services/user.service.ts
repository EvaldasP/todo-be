import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User> {
    return this._userRepository.findOne({ where: { username } });
  }
}
