import { AssetService } from './asset.service';
import createPrismaMock from 'prisma-mock';
import { seedAssets, seedProjects, seedUsers } from '../../__testData/seedData';
import { PrismaService } from '../shared/prisma.service';

describe('Asset Service', () => {
  let service: AssetService;

  beforeEach(() => {
    let client = createPrismaMock({
      user: seedUsers,
      project: seedProjects,
      asset: seedAssets,
    });

    service = new AssetService(client as PrismaService);
  });

  it('can grab a list of assets for a project', async () => {
    const assets = await service.getAssetsForProject(1);
    expect(assets.length).toEqual(seedAssets.length);
    expect(assets[0].id).toEqual(seedAssets[0].id);
  });
  it('returns an empty array for a project that does not have any assets', async () => {
    const assets = await service.getAssetsForProject(2);
    expect(assets).toEqual([]);
  });
  it('can insert a new asset for a project', async () => {
    const newAsset = await service.createAsset({
      projectId: 1,
      name: 'New Asset',
      data: new Buffer('12345'),
      itemWidth: 4,
      itemSpacing: 1,
      itemHeight: 4,
      description: 'test',
      totalWidth: 4 * 8,
      totalHeight: 4 * 8,
    });
    expect(newAsset.id).toEqual(3);
    expect(newAsset.name).toEqual('New Asset');
  });
  it('newly created asset can be gotten by the project it was assigned', async () => {
    const newAsset = await service.createAsset({
      projectId: 1,
      name: 'New Asset',
      data: new Buffer('12345'),
      itemWidth: 4,
      itemSpacing: 1,
      itemHeight: 4,
      description: 'test',
      totalWidth: 4 * 8,
      totalHeight: 4 * 8,
    });
    const assets = await service.getAssetsForProject(1);
    expect(assets.length).toEqual(seedAssets.length + 1);
  });

  it('can update an existing asset', async () => {
    const updatedAsset = await service.updateAsset(1, {
      name: 'Updated Asset',
    });
    expect(updatedAsset.name).toEqual('Updated Asset');
    expect(updatedAsset.itemSpacing).toEqual(seedAssets[0].itemSpacing);
  });
  it('can get an asset by id', async () => {
    const asset = await service.getAssetById(1);
    expect(asset.id).toEqual(1);
    expect(asset.name).toEqual(seedAssets[0].name);
  });
  it('returned asset contains asset items', async () => {
    const asset = await service.getAssetById(1);
    expect(asset.items.length).toBeGreaterThan(0);
  });
});
