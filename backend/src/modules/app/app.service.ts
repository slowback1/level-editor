import { Injectable } from '@nestjs/common';
import { PrismaClient, Project } from '@prisma/client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
