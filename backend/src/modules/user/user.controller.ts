import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from './user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

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
  @UseGuards(AuthGuard('jwt'))
  async change_password(
    @Body('password_request') user: UpdatePasswordDto,
    @Request() context: { user: User },
  ) {
    return await this.authService.change_password(user, context.user.id);
  }
}
