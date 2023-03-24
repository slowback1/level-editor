import {
  convertEntityToExport,
  convertEntityToRequest,
  convertRequestToEntity,
  LevelRequest,
} from './level.dto';
import {
  seedAssets,
  seedLayerTypes,
  seedLevels,
  seedLevelTileLayers,
  seedLevelTiles,
} from '../../__testData/seedData';

describe('convert to entity', () => {
  let result: LevelRequest;
  beforeEach(() => {
    result = convertEntityToRequest({
      layerTypes: seedLayerTypes,
      layers: seedLevelTileLayers,
      level: seedLevels[0],
      tiles: seedLevelTiles,
    });
  });

  it('can convert entities to a level object', () => {
    expect(result).toBeDefined();
  });
  it('has the correct level metadata', () => {
    expect(result.name).toEqual(seedLevels[0].name);
    expect(result.description).toEqual(seedLevels[0].description);
    expect(result.width).toEqual(seedLevels[0].width);
    expect(result.height).toEqual(seedLevels[0].height);
  });
  it('has the correct number of tile rows', () => {
    expect(result.tiles.length).toEqual(seedLevels[0].height);
  });
  it('has the correct number of tile columns in the first row', () => {
    expect(result.tiles[0].length).toEqual(seedLevels[0].width);
  });
  it('the first tile has the correct x and y coordinates', () => {
    expect(result.tiles[0][0].x).toEqual(0);
    expect(result.tiles[0][0].y).toEqual(0);
  });
  it("the first tile's first layer has the correct layer type", () => {
    expect(result.tiles[0][0].layers[0].layerType.label).toEqual(
      seedLayerTypes[0].label,
    );
  });
  it("the first tile's first layer has the correct asset", () => {
    expect(result.tiles[0][0].layers[0].asset.id).toEqual(seedAssets[0].id);
  });
});

describe('convert to request', () => {
  const request = convertEntityToRequest({
    layerTypes: seedLayerTypes,
    layers: seedLevelTileLayers,
    level: seedLevels[0],
    tiles: seedLevelTiles,
  });
  let result: ReturnType<typeof convertRequestToEntity>;
  beforeEach(() => {
    result = convertRequestToEntity(request);
  });

  it('contains the correct level metadata', () => {
    expect(result.level.name).toEqual(request.name);
    expect(result.level.description).toEqual(request.description);
    expect(result.level.width).toEqual(request.width);
    expect(result.level.height).toEqual(request.height);
  });
  it('contains the correct number of tiles', () => {
    expect(result.tiles.length).toEqual(request.width * request.height);
  });
  it('contains the correct number of layers', () => {
    expect(result.layers.length).toEqual(seedLevelTileLayers.length);
  });
  it('the first tile has the correct x and y coordinates', () => {
    expect(result.tiles[0].x).toEqual(0);
    expect(result.tiles[0].y).toEqual(0);
  });
  it("the first tile's first layer has the correct layer type", () => {
    expect(result.layers[0].layerTypeId).toEqual(seedLayerTypes[0].id);
  });
});

describe('export entity', () => {
  it("doesn't break when exporting an entity", () => {
    const result = convertEntityToExport({
      layerTypes: seedLayerTypes,
      layers: seedLevelTileLayers,
      level: seedLevels[0],
      tiles: seedLevelTiles,
      assets: seedAssets,
    });
    expect(result).toBeDefined();
  });

  it('contains the correct level metadata', () => {
    const result = convertEntityToExport({
      layerTypes: seedLayerTypes,
      layers: seedLevelTileLayers,
      level: seedLevels[0],
      tiles: seedLevelTiles,
      assets: seedAssets,
    });
    expect(result.meta.name).toEqual(seedLevels[0].name);
    expect(result.meta.key).toEqual(`level-${seedLevels[0].id}`);
    expect(result.meta.width).toEqual(seedLevels[0].width);
    expect(result.meta.height).toEqual(seedLevels[0].height);
  });

  it('contains the correct number of tiles', () => {
    const result = convertEntityToExport({
      layerTypes: seedLayerTypes,
      layers: seedLevelTileLayers,
      level: seedLevels[0],
      tiles: seedLevelTiles,
      assets: seedAssets,
    });
    expect(result.tiles.flatMap((t) => t).length).toEqual(
      seedLevels[0].width * seedLevels[0].height,
    );
  });
});
