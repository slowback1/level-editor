import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body('user') user: CreateUserDto) {
    return await this.authService.register(user);
  }
  @Post('login')
  async login(@Body('user') user: LoginUserDto) {
    return await this.authService.login(user);
  }
}
