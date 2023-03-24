import {
  Asset,
  LayerType,
  Level,
  LevelTile,
  LevelTileLayer,
} from '@prisma/client';

export interface LevelRequest {
  id?: number;
  name: string;
  description: string;
  width: number;
  height: number;
  projectId: number;
  tiles: LevelTileRequest[][];
}
export interface LevelTileRequest {
  id?: number;
  x: number;
  y: number;
  layers: LevelTileLayerRequest[];
}

export interface LevelTileLayerRequest {
  id?: number;
  layerType: {
    id?: number;
    label: string;
    value: string;
  };
  asset?: {
    id?: number;
    x: number;
    y: number;
  };
}

export interface LevelExport {
  meta: LevelExportMeta;
  tiles: LevelExportTile[][];
}
export interface LevelExportMeta {
  key: string;
  name: string;
  width: number;
  height: number;
}
export interface LevelExportTile {
  layers: LevelExportTileLayer[];
}
export interface LevelExportTileLayer {
  type: string;
  spriteSheetKey: string;
  spriteSheetFrame: number;
}

export function convertEntityToRequest(context: {
  level: Level;
  tiles: LevelTile[];
  layers: LevelTileLayer[];
  layerTypes: LayerType[];
}): LevelRequest {
  const { level, tiles, layers, layerTypes } = context;

  const levelRequest: LevelRequest = {
    id: level.id,
    name: level.name,
    description: level.description,
    projectId: level.projectId,
    width: level.width,
    height: level.height,
    tiles: [],
  };
  for (let y = 0; y < level.height; y++) {
    levelRequest.tiles[y] = [];
    for (let x = 0; x < level.width; x++) {
      levelRequest.tiles[y][x] = {
        id: 0,
        x: x,
        y: y,
        layers: [],
      };
    }
  }
  tiles.forEach((tile) => {
    levelRequest.tiles[tile.y][tile.x] = {
      id: tile.id,
      x: tile.x,
      y: tile.y,
      layers: [],
    };
  });
  layers.forEach((layer) => {
    const parentTile = tiles.find((tile) => tile.id === layer.levelTileId);
    if (!parentTile) return;

    const parentLayer = layerTypes.find(
      (layerType) => layer.layerTypeId === layerType.id,
    );

    levelRequest.tiles[parentTile.y][parentTile.x].layers.push({
      id: layer.id,
      layerType: {
        id: layer.layerTypeId,
        label: parentLayer.label,
        value: parentLayer.value,
      },
      asset: {
        id: layer.assetId,
        x: layer.assetX,
        y: layer.assetY,
      },
    });
  });
  return levelRequest;
}

export function convertRequestToEntity(request: LevelRequest): {
  level: Level;
  tiles: LevelTile[];
  layers: LevelTileLayer[];
} {
  const level: Level = {
    id: request.id,
    name: request.name,
    description: request.description,
    projectId: request.projectId,
    width: request.width,
    height: request.height,
  };
  const tiles: LevelTile[] = [];
  const layers: LevelTileLayer[] = [];
  request.tiles.forEach((tileRow) => {
    tileRow.forEach((tile) => {
      tiles.push({
        id: tile.id,
        x: tile.x,
        y: tile.y,
        levelId: level.id,
      });
      tile.layers.forEach((layer) => {
        layers.push({
          id: layer.id,
          layerTypeId: layer.layerType.id,
          assetId: layer.asset.id,
          assetX: layer.asset.x,
          assetY: layer.asset.y,
          levelTileId: tile.id,
        });
      });
    });
  });
  return {
    level,
    tiles,
    layers,
  };
}

export function convertEntityToExport(context: {
  level: Level;
  tiles: LevelTile[];
  layers: LevelTileLayer[];
  layerTypes: LayerType[];
  assets: Asset[];
}): LevelExport {
  const { level, tiles, layers, layerTypes, assets } = context;

  const levelExport: LevelExport = {
    meta: {
      key: `level-${level.id}`,
      name: level.name,
      width: level.width,
      height: level.height,
    },
    tiles: [],
  };
  for (let y = 0; y < level.height; y++) {
    levelExport.tiles[y] = [];
    for (let x = 0; x < level.width; x++) {
      levelExport.tiles[y][x] = {
        layers: [],
      };
    }
  }
  tiles.forEach((tile) => {
    levelExport.tiles[tile.y][tile.x] = {
      layers: [],
    };
  });
  layers.forEach((layer) => {
    const parentTile = tiles.find((tile) => tile.id === layer.levelTileId);
    const parentLayer = layerTypes.find(
      (layerType) => layer.layerTypeId === layerType.id,
    );

    const asset = assets.find((asset) => asset.id === layer.assetId);
    const getAssetFrame = (x: number, y: number): number => {
      if (!asset) return 0;

      const tilesWidth = Math.floor(
        asset.totalWidth / (asset.itemWidth + asset.itemSpacing),
      );
      const tilesHeight = Math.floor(
        asset.totalHeight / (asset.itemHeight + asset.itemSpacing),
      );

      const rowCoefficient = y * tilesWidth;
      const columnCoefficient = x;

      return rowCoefficient + columnCoefficient;
    };

    levelExport.tiles[parentTile.y][parentTile.x].layers.push({
      type: parentLayer.value,
      spriteSheetKey: asset?.name ?? '',
      spriteSheetFrame: getAssetFrame(layer.assetX, layer.assetY),
    });
  });
  return levelExport;
}
