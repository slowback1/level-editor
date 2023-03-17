import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from './user.dto';
import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from '../shared/prisma.service';

interface FormatLogin extends Partial<User> {}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await compare(payload.old_password, user.passwordHash);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.user.update({
      where: { id },
      data: { passwordHash: await hash(payload.new_password, 10) },
    });
  }
  async create(userDto: CreateUserDto): Promise<any> {
    const userInDb = await this.prisma.user.findFirst({
      where: { name: userDto.name },
    });
    if (userInDb) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }
    return await this.prisma.user.create({
      data: {
        passwordHash: await hash(userDto.password, 10),
        name: userDto.name,
        email: userDto.email,
      },
    });
  }
  async findByLogin({
    username,
    password,
  }: LoginUserDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { name: username },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(password, user.passwordHash);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const { passwordHash: p, ...rest } = user;
    return rest;
  }
  async findByPayload({ name }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { name: name },
    });
  }
}
