import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { LayerType } from '@prisma/client';

@Injectable()
export class LayerTypeService {
  constructor(private readonly client: PrismaService) {}

  async getAllLayerTypes(): Promise<LayerType[]> {
    const layerTypes = await this.client.layerType.findMany();
    return layerTypes;
  }

  async getLayerTypeById(id: number): Promise<LayerType> {
    const layerType = await this.client.layerType.findUnique({
      where: { id },
    });
    return layerType;
  }

  async createLayerType(layerType: {
    label: string;
    value: string;
    projectId: number;
  }): Promise<LayerType> {
    const newLayerType = await this.client.layerType.create({
      data: {
        label: layerType.label,
        value: layerType.value,
        projectId: layerType.projectId,
      },
    });
    return newLayerType;
  }

  async updateLayerType(
    id: number,
    layerType: { label: string; value: string; projectId: number },
  ): Promise<LayerType> {
    const layerTypeExists = await this.client.layerType.findUnique({
      where: { id },
    });
    if (!layerTypeExists) return null;

    const updatedLayerType = await this.client.layerType.update({
      where: { id },
      data: {
        label: layerType.label,
        value: layerType.value,
        projectId: layerType.projectId,
      },
    });
    return updatedLayerType;
  }

  async getLayerTypeByProjectId(number: number): Promise<LayerType[]> {
    const layerTypes = await this.client.layerType.findMany({
      where: { projectId: number },
    });
    return layerTypes;
  }
}
