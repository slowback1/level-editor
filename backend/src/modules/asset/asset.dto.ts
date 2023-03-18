import { Asset } from '@prisma/client';

export interface AssetItem {
  key: string;
  originPoint: {
    x: number;
    y: number;
  };
}
type AssetWithoutData = Omit<Asset, 'data'>;
export type AssetRequest = AssetWithoutData & { data: string };

export function convertAssetRequest(request: AssetRequest): Asset {
  return {
    id: request?.id,
    name: request?.name,
    description: request?.description,
    itemWidth: request?.itemWidth,
    itemHeight: request?.itemHeight,
    itemSpacing: request?.itemSpacing,
    totalWidth: request?.totalWidth,
    totalHeight: request?.totalHeight,
    projectId: request?.projectId,
    data: request?.data ? Buffer.from(request.data) : undefined,
  };
}

export class AssetResponse implements AssetWithoutData {
  public static CreateFromAsset(assetEntity: Asset): AssetResponse {
    return new AssetResponse(assetEntity, this.createAssetItems(assetEntity));
  }
  private static createAssetItems(entity: Asset): AssetItem[] {
    let items: AssetItem[] = [];

    for (
      let y = 0;
      y < entity.totalHeight;
      y += entity.itemHeight + entity.itemSpacing
    ) {
      for (
        let x = 0;
        x < entity.totalWidth;
        x += entity.itemWidth + entity.itemSpacing
      ) {
        items.push({
          key: `${x}-${y}`,
          originPoint: {
            x,
            y,
          },
        });
      }
    }

    return items;
  }
  private constructor(assetEntity: Asset, public readonly items: AssetItem[]) {
    this.id = assetEntity.id;
    this.name = assetEntity.name;
    this.description = assetEntity.description;
    this.itemWidth = assetEntity.itemWidth;
    this.itemHeight = assetEntity.itemHeight;
    this.itemSpacing = assetEntity.itemSpacing;
    this.totalWidth = assetEntity.totalWidth;
    this.totalHeight = assetEntity.totalHeight;
    this.projectId = assetEntity.projectId;

    this.data = assetEntity.data.toString();
  }

  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly data: string;
  readonly itemWidth: number;
  readonly itemHeight: number;
  readonly itemSpacing: number;
  readonly totalWidth: number;
  readonly totalHeight: number;
  readonly projectId: number;
}
