import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects() {
    return await this.projectService.getAllProjects();
  }
  @Get('/:id')
  async getProjectById(@Param() params: { id: string }) {
    return await this.projectService.getProjectById(Number(params.id));
  }
  @Post()
  async createProject(@Body('project') project: { name: string }) {
    return await this.projectService.createProject(project);
  }
  @Put(':id')
  async updateProject(
    @Param() params: { id: string },
    @Body('project') project: { name: string },
  ) {
    return await this.projectService.updateProject(Number(params.id), project);
  }
}
