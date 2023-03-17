import { LayerTypeService } from './layerType.service';
import { PrismaService } from '../shared/prisma.service';
import createPrismaMock from 'prisma-mock';
import { seedLayerTypes, seedProjects } from '../../__testData/seedData';

describe('LayerTypeService', () => {
  let service: LayerTypeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    prismaService = createPrismaMock({
      project: seedProjects,
      layerType: seedLayerTypes,
    });

    service = new LayerTypeService(prismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllLayerTypes', () => {
    it('should return an array of layer types', async () => {
      const result = await service.getAllLayerTypes();
      expect(result).toEqual(seedLayerTypes);
    });
  });

  describe('getLayerTypeById', () => {
    it('should return a layer type', async () => {
      const result = await service.getLayerTypeById(1);
      expect(result).toEqual(seedLayerTypes[0]);
    });
  });

  describe('createLayerType', () => {
    it('should return a new layer type', async () => {
      const result = await service.createLayerType({
        label: 'label',
        value: 'value',
        projectId: 1,
      });
      expect(result).toEqual({
        label: 'label',
        value: 'value',
        projectId: 1,
        id: 3,
      });
    });
  });

  describe('updateLayerType', () => {
    it('should return an updated layer type', async () => {
      const result = await service.updateLayerType(1, {
        label: 'label',
        value: 'value',
        projectId: 1,
      });
      expect(result).toEqual({
        label: 'label',
        value: 'value',
        projectId: 1,
        id: 1,
      });
    });
  });

  describe('getLayerTypeByProjectId', () => {
    it('should return an array of layer types', async () => {
      const result = await service.getLayerTypeByProjectId(1);
      expect(result).toEqual(seedLayerTypes);
    });
  });
});
