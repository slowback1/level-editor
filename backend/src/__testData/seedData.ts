import { Project, LayerType } from '@prisma/client';

export const seedProjects: Project[] = [
  {
    id: 1,
    name: 'Project 1',
  },
  {
    id: 2,
    name: 'Project 2',
  },
  {
    id: 3,
    name: 'Project 3',
  },
];

export const seedLayerTypes: LayerType[] = [
  {
    id: 1,
    label: 'Layer Type 1',
    value: 'layer-type-1',
    projectId: 1,
  },
  {
    id: 2,
    label: 'Layer Type 2',
    value: 'layer-type-2',
    projectId: 1,
  },
];
