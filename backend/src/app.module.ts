import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { ProjectService } from './modules/project/project.service';
import { PrismaService } from './modules/shared/prisma.service';
import { ProjectController } from './modules/project/project.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectController],
  providers: [AppService, ProjectService, PrismaService],
})
export class AppModule {}
