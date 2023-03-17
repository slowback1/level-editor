import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LayerTypeService } from './layerType.service';

@Controller('layer-type')
export class LayerTypeController {
  constructor(private readonly layerTypeService: LayerTypeService) {}

  @Get()
  async getAllLayerTypes() {
    return await this.layerTypeService.getAllLayerTypes();
  }
  @Get('project/:id')
  async getLayerTypeByProjectId(@Param() params: { id: string }) {
    return await this.layerTypeService.getLayerTypeByProjectId(
      Number(params.id),
    );
  }

  @Get(':id')
  async getLayerTypeById(@Param() params: { id: string }) {
    return await this.layerTypeService.getLayerTypeById(Number(params.id));
  }
  @Post()
  async createLayerType(
    @Body('layerType')
    layerType: {
      label: string;
      value: string;
      projectId: number;
    },
  ) {
    return await this.layerTypeService.createLayerType(layerType);
  }
  @Put(':id')
  async updateLayerType(
    @Param() params: { id: string },
    @Body('layerType')
    layerType: { label: string; value: string; projectId: number },
  ) {
    return await this.layerTypeService.updateLayerType(
      Number(params.id),
      layerType,
    );
  }
}
