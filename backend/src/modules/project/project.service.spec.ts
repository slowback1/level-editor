import createPrismaMock from 'prisma-mock';
import { PrismaClient, Project } from '@prisma/client';
import { ProjectService } from './project.service';
import { seedProjects } from '../../__testData/seedData';
import { PrismaService } from '../shared/prisma.service';

describe('Project Service', () => {
  let service: ProjectService;
  beforeEach(() => {
    let client = createPrismaMock({ project: seedProjects });
    service = new ProjectService(client as PrismaService);
  });

  it('can grab a list of projects', async () => {
    const projects = await service.getAllProjects();
    expect(projects).toEqual(seedProjects);
  });
  it('can grab a project by id', async () => {
    const project = await service.getProjectById(1);
    expect(project).toEqual(seedProjects[0]);
  });
  it("returns null if it can't find a project", async () => {
    const project = await service.getProjectById(100);
    expect(project).toBeNull();
  });
  it('can create a project', async () => {
    const newProject = await service.createProject({ name: 'New Project' });
    expect(newProject).toEqual({ id: 4, name: 'New Project' });
  });
  it('can update an existing project', async () => {
    const updatedProject = await service.updateProject(1, {
      name: 'Updated Project',
    });
    expect(updatedProject).toEqual({ id: 1, name: 'Updated Project' });
  });
  it("returns null if it can't find a project to update", async () => {
    const updatedProject = await service.updateProject(100, {
      name: 'Updated Project',
    });
    expect(updatedProject).toBeNull();
  });
});
