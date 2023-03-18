import { AssetResponse, convertAssetRequest } from './asset.dto';
import { seedAssets } from '../../__testData/seedData';

describe('AssetResponse', () => {
  it('should be defined', () => {
    expect(AssetResponse.CreateFromAsset(seedAssets[0])).toBeDefined();
  });
  it("should have the same base properties as the asset it's created from", () => {
    const asset = seedAssets[0];
    const assetResponse = AssetResponse.CreateFromAsset(asset);
    expect(assetResponse.id).toEqual(asset.id);
    expect(assetResponse.name).toEqual(asset.name);
    expect(assetResponse.description).toEqual(asset.description);
    expect(assetResponse.data).toEqual(asset.data.toString());
    expect(assetResponse.itemWidth).toEqual(asset.itemWidth);
    expect(assetResponse.itemHeight).toEqual(asset.itemHeight);
    expect(assetResponse.itemSpacing).toEqual(asset.itemSpacing);
    expect(assetResponse.totalWidth).toEqual(asset.totalWidth);
    expect(assetResponse.totalHeight).toEqual(asset.totalHeight);
    expect(assetResponse.projectId).toEqual(asset.projectId);
  });
  it("has asset items that are defined by the asset's data", () => {
    const asset = seedAssets[0];
    const assetResponse = AssetResponse.CreateFromAsset(asset);
    expect(assetResponse.items).toBeDefined();
    expect(assetResponse.items.length).toBeGreaterThan(0);
  });
  it('the first the asset item has coordinates 0,0', () => {
    const asset = seedAssets[0];
    const assetResponse = AssetResponse.CreateFromAsset(asset);
    expect(assetResponse.items[0].originPoint.x).toEqual(0);
    expect(assetResponse.items[0].originPoint.y).toEqual(0);
  });
  it('the second asset item has coordinates 32,0', () => {
    const asset = seedAssets[0];
    const assetResponse = AssetResponse.CreateFromAsset(asset);
    expect(assetResponse.items[1].originPoint.x).toEqual(32);
    expect(assetResponse.items[1].originPoint.y).toEqual(0);
  });
  it('the last asset item has coordinates 224,224', () => {
    const asset = seedAssets[0];
    const assetResponse = AssetResponse.CreateFromAsset(asset);
    expect(
      assetResponse.items[assetResponse.items.length - 1].originPoint.x,
    ).toEqual(224);
    expect(
      assetResponse.items[assetResponse.items.length - 1].originPoint.y,
    ).toEqual(224);
  });
});
describe('convertAssetRequest', () => {
  it("should have the same base properties as the asset it's created from", () => {
    const assetResponse = AssetResponse.CreateFromAsset(seedAssets[0]);

    const asset = convertAssetRequest(assetResponse);

    expect(assetResponse.id).toEqual(asset.id);
    expect(assetResponse.name).toEqual(asset.name);
    expect(assetResponse.description).toEqual(asset.description);
    expect(assetResponse.data).toEqual(asset.data.toString());
    expect(assetResponse.itemWidth).toEqual(asset.itemWidth);
    expect(assetResponse.itemHeight).toEqual(asset.itemHeight);
    expect(assetResponse.itemSpacing).toEqual(asset.itemSpacing);
    expect(assetResponse.totalWidth).toEqual(asset.totalWidth);
    expect(assetResponse.totalHeight).toEqual(asset.totalHeight);
    expect(assetResponse.projectId).toEqual(asset.projectId);
  });
  it("should convert the asset's data to a buffer", () => {
    const assetResponse = AssetResponse.CreateFromAsset(seedAssets[0]);

    const asset = convertAssetRequest(assetResponse);

    expect(asset.data).toBeInstanceOf(Buffer);
  });
});
