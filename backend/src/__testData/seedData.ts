import {
  Project,
  LayerType,
  User,
  Asset,
  Level,
  LevelTile,
  LevelTileLayer,
} from '@prisma/client';

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

export const seedUsers: User[] = [
  {
    id: 1,
    name: 'test 1',
    passwordHash: 'test 1',
    email: 'test 1',
  },
  {
    id: 2,
    name: 'test 2',
    passwordHash: 'test 2',
    email: 'test 2',
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

export const seedAssets: Asset[] = [
  {
    id: 1,
    name: 'Asset 1',
    data: new Buffer('test'),
    projectId: 1,
    description: 'Asset 1',
    itemHeight: 32,
    itemSpacing: 0,
    itemWidth: 32,
    totalWidth: 32 * 8,
    totalHeight: 32 * 8,
  },
  {
    id: 2,
    name: 'Asset 2',
    data: new Buffer('test'),
    projectId: 1,
    description: 'Asset 2',
    itemHeight: 32,
    itemSpacing: 0,
    itemWidth: 32,
    totalWidth: 32 * 8,
    totalHeight: 32 * 8,
  },
];

export const seedLevels: Level[] = [
  {
    id: 1,
    name: 'Level 1',
    description: 'Level 1',
    projectId: 1,
    height: 4,
    width: 4,
  },
];

export const seedLevelTiles: LevelTile[] = [
  {
    id: 1,
    x: 0,
    y: 0,
    levelId: 1,
  },
  {
    id: 2,
    x: 1,
    y: 0,
    levelId: 1,
  },
  {
    id: 3,
    x: 2,
    y: 0,
    levelId: 1,
  },
  {
    id: 4,
    x: 3,
    y: 0,
    levelId: 1,
  },
  {
    id: 5,
    x: 0,
    y: 1,
    levelId: 1,
  },
  {
    id: 6,
    x: 1,
    y: 1,
    levelId: 1,
  },
  {
    id: 7,
    x: 2,
    y: 1,
    levelId: 1,
  },
  {
    id: 8,
    x: 3,
    y: 1,
    levelId: 1,
  },
  {
    id: 9,
    x: 0,
    y: 2,
    levelId: 1,
  },
  {
    id: 10,
    x: 1,
    y: 2,
    levelId: 1,
  },
  {
    id: 11,
    x: 2,
    y: 2,
    levelId: 1,
  },
  {
    id: 12,
    x: 3,
    y: 2,
    levelId: 1,
  },
  {
    id: 13,
    x: 0,
    y: 3,
    levelId: 1,
  },
  {
    id: 14,
    x: 1,
    y: 3,
    levelId: 1,
  },
  {
    id: 15,
    x: 2,
    y: 3,
    levelId: 1,
  },
  {
    id: 16,
    x: 3,
    y: 3,
    levelId: 1,
  },
];

export const seedLevelTileLayers: LevelTileLayer[] = [
  {
    id: 1,
    levelTileId: 1,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 2,
    levelTileId: 2,
    layerTypeId: 2,
    assetId: 2,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 3,
    levelTileId: 3,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 4,
    levelTileId: 4,
    layerTypeId: 2,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 5,
    levelTileId: 5,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 6,
    levelTileId: 6,
    layerTypeId: 2,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 7,
    levelTileId: 7,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 8,
    levelTileId: 8,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 9,
    levelTileId: 9,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 10,
    levelTileId: 10,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 11,
    levelTileId: 11,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 12,
    levelTileId: 12,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 13,
    levelTileId: 13,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 14,
    levelTileId: 14,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 15,
    levelTileId: 15,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
  {
    id: 16,
    levelTileId: 16,
    layerTypeId: 1,
    assetId: 1,
    assetX: 0,
    assetY: 0,
  },
];
