import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects(@Request() context: { user: User }) {
    const userId = context.user.id;

    return await this.projectService.getProjectsByUserId(userId);
  }
  @Get('/:id')
  async getProjectById(@Param() params: { id: string }) {
    return await this.projectService.getProjectById(Number(params.id));
  }
  @Post()
  async createProject(
    @Body('project') project: { name: string },
    @Request() context: { user: User },
  ) {
    const userId = context.user.id;

    return await this.projectService.createProject({
      name: project.name,
      userId: userId,
    });
  }
  @Put(':id')
  async updateProject(
    @Param() params: { id: string },
    @Body('project') project: { name: string },
  ) {
    return await this.projectService.updateProject(Number(params.id), project);
  }
}
