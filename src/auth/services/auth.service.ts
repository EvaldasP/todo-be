import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  public async login({
    username,
    password,
  }: LoginDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: this._jwtService.sign({ username: user.username }),
    };
  }

  private async validateUser(username: string, pass: string): Promise<User> {
    const user = await this._userService.findOneByUsername(username);

    if (user?.password === pass) {
      return user;
    }
    return null;
  }
}
