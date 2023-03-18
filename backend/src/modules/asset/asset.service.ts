import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { Asset } from '@prisma/client';
import { AssetRequest, AssetResponse } from './asset.dto';

@Injectable()
export class AssetService {
  constructor(private readonly client: PrismaService) {}

  public async getAssetsForProject(
    projectId: number,
  ): Promise<AssetResponse[]> {
    const assets = await this.client.asset.findMany({
      where: {
        projectId,
      },
    });

    return assets.map((asset) => AssetResponse.CreateFromAsset(asset));
  }
  public async createAsset(asset: Partial<Asset>): Promise<AssetResponse> {
    const newAsset = await this.client.asset.create({
      data: {
        name: asset.name,
        data: asset.data,
        itemHeight: asset.itemHeight,
        itemWidth: asset.itemWidth,
        description: asset.description,
        projectId: asset.projectId,
        itemSpacing: asset.itemSpacing,
        totalWidth: asset.totalWidth,
        totalHeight: asset.totalHeight,
      },
    });

    return AssetResponse.CreateFromAsset(newAsset);
  }
  public async updateAsset(
    id: number,
    asset: Partial<AssetRequest>,
  ): Promise<AssetResponse> {
    const stored = await this.client.asset.findUnique({
      where: {
        id,
      },
    });

    if (!stored) {
      throw new Error('Asset not found');
    }
    if (!asset?.data) asset.data = stored.data.toString();

    const { data, ...rest } = asset;
    const updatedAsset = {
      ...stored,
      ...rest,
    };
    updatedAsset.data = Buffer.from(data);

    await this.client.asset.update({
      where: {
        id,
      },
      data: {
        name: updatedAsset.name,
        data: updatedAsset.data,
        itemHeight: updatedAsset.itemHeight,
        itemWidth: updatedAsset.itemWidth,
        description: updatedAsset.description,
        projectId: updatedAsset.projectId,
        itemSpacing: updatedAsset.itemSpacing,
        totalWidth: updatedAsset.totalWidth,
        totalHeight: updatedAsset.totalHeight,
      },
    });

    return AssetResponse.CreateFromAsset(updatedAsset as Asset);
  }

  async getAssetById(id: number): Promise<AssetResponse> {
    const asset = await this.client.asset.findUnique({
      where: {
        id,
      },
    });
    return AssetResponse.CreateFromAsset(asset);
  }
}
