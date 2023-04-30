import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body('user') user: CreateUserDto) {
    return await this.authService.register(user);
  }

  @Post('login')
  async login(@Body('user') user: LoginUserDto) {
    return await this.authService.login(user);
  }

  @Get("session")
  @UseGuards(AuthGuard('jwt'))
  async getSession(@Request() context: { user: User }) {
    return { id: context.user.id, name: context.user.name };
  }

  @UseGuards(AuthGuard('jwt'))
  async change_password(
    @Body('password_request') user: UpdatePasswordDto,
    @Request() context: { user: User },
  ) {
    return await this.authService.change_password(user, context.user.id);
  }
}
