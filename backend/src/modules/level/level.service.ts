import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import {
  convertEntityToExport,
  convertEntityToRequest,
  LevelRequest,
} from './level.dto';

@Injectable()
export class LevelService {
  constructor(private readonly client: PrismaService) {}

  async create(data: LevelRequest) {
    const { tiles, ...levelData } = data;
    const level = await this.client.level.create({
      data: {
        name: levelData.name,
        description: levelData.description,
        projectId: levelData.projectId,
        width: levelData.width,
        height: levelData.height,
      },
    });

    const levelTiles = await Promise.all(
      tiles.map((row) =>
        Promise.all(
          row.map((tile) =>
            this.client.levelTile.create({
              data: {
                levelId: level.id,
                x: tile.x,
                y: tile.y,
              },
            }),
          ),
        ),
      ),
    );

    const levelTileLayers = await Promise.all(
      tiles.map((row) =>
        Promise.all(
          row.map((tile) =>
            Promise.all(
              tile.layers.map((layer) =>
                this.client.levelTileLayer.create({
                  data: {
                    levelTileId: levelTiles[tile.y][tile.x].id,
                    assetX: layer.asset.x,
                    assetY: layer.asset.y,
                    assetId: layer.asset.id,
                    layerTypeId: layer.layerType.id,
                  },
                }),
              ),
            ),
          ),
        ),
      ),
    );

    const layerTypes = await this.client.layerType.findMany({
      where: {
        projectId: {
          equals: level.projectId,
        },
      },
    });

    const result = convertEntityToRequest({
      level,
      tiles: levelTiles.flatMap((t) => t),
      layers: levelTileLayers.flat(2),
      layerTypes: layerTypes,
    });

    return result;
  }

  async update(data: LevelRequest) {
    const { tiles, ...levelData } = data;
    const level = await this.client.level.update({
      where: {
        id: levelData.id,
      },
      data: {
        name: levelData.name,
        description: levelData.description,
        projectId: levelData.projectId,
        width: levelData.width,
        height: levelData.height,
      },
    });

    const levelTiles = await Promise.all(
      tiles.map((row) =>
        Promise.all(
          row.map((tile) => {
            if (tile.id)
              return this.client.levelTile.update({
                where: {
                  id: tile.id,
                },
                data: {
                  levelId: level.id,
                  x: tile.x,
                  y: tile.y,
                },
              });
            else
              return this.client.levelTile.create({
                data: {
                  levelId: level.id,
                  x: tile.x,
                  y: tile.y,
                },
              });
          }),
        ),
      ),
    );

    const levelTileLayers = await Promise.all(
      tiles.map((row) =>
        Promise.all(
          row.map((tile) =>
            Promise.all(
              tile.layers.map((layer) => {
                if (layer.id)
                  return this.client.levelTileLayer.update({
                    where: {
                      id: layer.id,
                    },
                    data: {
                      levelTileId: levelTiles[tile.y][tile.x].id,
                      assetX: layer.asset.x,
                      assetY: layer.asset.y,
                      assetId: layer.asset.id,
                      layerTypeId: layer.layerType.id,
                    },
                  });
                else
                  return this.client.levelTileLayer.create({
                    data: {
                      levelTileId: levelTiles[tile.y][tile.x].id,
                      assetX: layer.asset.x,
                      assetY: layer.asset.y,
                      assetId: layer.asset.id,
                      layerTypeId: layer.layerType.id,
                    },
                  });
              }),
            ),
          ),
        ),
      ),
    );

    const layerTypes = await this.client.layerType.findMany({
      where: {
        projectId: {
          equals: level.projectId,
        },
      },
    });

    const result = convertEntityToRequest({
      level,
      tiles: levelTiles.flatMap((t) => t),
      layers: levelTileLayers.flat(2),
      layerTypes: layerTypes,
    });

    return result;
  }

  async getById(id: number) {
    const level = await this.client.level.findUnique({
      where: {
        id,
      },
    });

    const levelTiles = await this.client.levelTile.findMany({
      where: {
        levelId: {
          equals: level.id,
        },
      },
    });

    const levelTileLayers = await this.client.levelTileLayer.findMany({
      where: {
        levelTileId: {
          in: levelTiles.map((t) => t.id),
        },
      },
    });

    const layerTypes = await this.client.layerType.findMany({
      where: {
        projectId: {
          equals: level.projectId,
        },
      },
    });

    const result = convertEntityToRequest({
      level,
      tiles: levelTiles,
      layers: levelTileLayers,
      layerTypes: layerTypes,
    });

    return result;
  }

  async getAllForProject(projectId: number) {
    const levels = await this.client.level.findMany({
      where: {
        projectId,
      },
    });

    const levelTiles = await this.client.levelTile.findMany({
      where: {
        levelId: {
          in: levels.map((l) => l.id),
        },
      },
    });

    const levelTileLayers = await this.client.levelTileLayer.findMany({
      where: {
        levelTileId: {
          in: levelTiles.map((t) => t.id),
        },
      },
    });

    const layerTypes = await this.client.layerType.findMany({
      where: {
        projectId: {
          equals: projectId,
        },
      },
    });

    const result = levels.map((level) =>
      convertEntityToRequest({
        level,
        tiles: levelTiles.filter((t) => t.levelId === level.id),
        layers: levelTileLayers.filter((l) =>
          levelTiles.some(
            (t) => t.id === l.levelTileId && t.levelId === level.id,
          ),
        ),
        layerTypes: layerTypes,
      }),
    );

    return result;
  }

  async exportLevel(id: number) {
    const level = await this.client.level.findUnique({
      where: {
        id,
      },
    });

    const levelTiles = await this.client.levelTile.findMany({
      where: {
        levelId: {
          equals: level.id,
        },
      },
    });

    const levelTileLayers = await this.client.levelTileLayer.findMany({
      where: {
        levelTileId: {
          in: levelTiles.map((t) => t.id),
        },
      },
    });

    const layerTypes = await this.client.layerType.findMany({
      where: {
        projectId: {
          equals: level.projectId,
        },
      },
    });

    const assets = await this.client.asset.findMany({
      where: {
        projectId: {
          equals: level.projectId,
        },
      },
    });

    const result = convertEntityToExport({
      level,
      tiles: levelTiles,
      layers: levelTileLayers,
      layerTypes: layerTypes,
      assets,
    });

    return result;
  }
}
