import { Injectable } from '@nestjs/common';
import { PrismaClient, Project } from '@prisma/client';
import { PrismaService } from '../shared/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly client: PrismaService) {}

  async getAllProjects(): Promise<Project[]> {
    const projects = await this.client.project.findMany();
    return projects;
  }

  async getProjectById(id: number): Promise<Project> {
    const project = await this.client.project.findUnique({
      where: { id },
    });
    return project;
  }

  async createProject(project: { name: string }): Promise<Project> {
    const newProject = await this.client.project.create({
      data: {
        name: project.name,
      },
    });
    return newProject;
  }

  async updateProject(id: number, project: { name: string }): Promise<Project> {
    const projectExists = await this.client.project.findUnique({
      where: { id },
    });
    if (!projectExists) return null;

    const updatedProject = await this.client.project.update({
      where: { id },
      data: {
        name: project.name,
      },
    });
    return updatedProject;
  }
}
