import { LevelService } from './level.service';
import createPrismaMock from 'prisma-mock';
import {
  seedAssets,
  seedLayerTypes,
  seedLevels,
  seedLevelTileLayers,
  seedLevelTiles,
  seedProjects,
} from '../../__testData/seedData';
import { PrismaService } from '../shared/prisma.service';
import { convertEntityToRequest } from './level.dto';

describe('Level Service', () => {
  let service: LevelService;

  beforeEach(() => {
    let client = createPrismaMock({
      project: seedProjects,
      asset: seedAssets,
      layerType: seedLayerTypes,
      level: seedLevels,
      levelTile: seedLevelTiles,
      levelTileLayer: seedLevelTileLayers,
    });

    service = new LevelService(client as PrismaService);
  });
  function createLevelRequest() {
    return convertEntityToRequest({
      level: seedLevels[0],
      tiles: seedLevelTiles,
      layerTypes: seedLayerTypes,
      layers: seedLevelTileLayers,
    });
  }

  it('can create a level', async () => {
    const levelRequest = createLevelRequest();
    const result = await service.create(levelRequest);

    expect(result).toBeDefined();
    expect(result.id).not.toEqual(seedLevels[0].id);
  });
  it('creating a level has tile layers', async () => {
    const levelRequest = createLevelRequest();
    const result = await service.create(levelRequest);

    expect(result.tiles[0][0].layers.length).toEqual(1);
  });

  it('can update a level', async () => {
    const levelRequest = createLevelRequest();
    levelRequest.name = 'New Name';
    const result = await service.update(levelRequest);

    expect(result).toBeDefined();
    expect(result.id).toEqual(seedLevels[0].id);
    expect(result.name).toEqual('New Name');
  });
  it('can update the number of tiles a level has', async () => {
    const levelRequest = createLevelRequest();
    levelRequest.width = 10;
    levelRequest.height = 10;
    const result = await service.update(levelRequest);

    expect(result).toBeDefined();
    expect(result.tiles.length).toEqual(10);
    expect(result.tiles[0].length).toEqual(10);
  });
  it("can add new tiles to a level's tiles", async () => {
    const levelRequest = createLevelRequest();
    levelRequest.width++;

    levelRequest.tiles.forEach((row, y) => {
      levelRequest.tiles[y].push({
        x: levelRequest.tiles[y].length,
        y,
        layers: [
          {
            layerType: {
              id: seedLayerTypes[0].id,
              label: seedLayerTypes[0].label,
              value: seedLayerTypes[0].value,
            },
            asset: {
              id: seedAssets[0].id,
              x: 0,
              y: 0,
            },
          },
        ],
      });
    });

    const result = await service.update(levelRequest);

    expect(result).toBeDefined();
    const lastTileInRow = result.tiles[0][result.tiles[0].length - 1];
    expect(lastTileInRow.layers.length).toEqual(1);
    expect(lastTileInRow.id).not.toEqual(seedLevelTiles[0].id);
  });

  it('can get a level by id', async () => {
    const result = await service.getById(seedLevels[0].id);

    expect(result).toBeDefined();
    expect(result.id).toEqual(seedLevels[0].id);
  });

  it('can get all the levels for a project', async () => {
    const result = await service.getAllForProject(seedProjects[0].id);
    expect(result.length).toEqual(1);
  });

  it("can export a level's data", async () => {
    const result = await service.exportLevel(seedLevels[0].id);
    expect(result).toBeDefined();
    expect(result.tiles.length).toEqual(seedLevels[0].height);
    expect(result.tiles[0].length).toEqual(seedLevels[0].width);
  });
});
