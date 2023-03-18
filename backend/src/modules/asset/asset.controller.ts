import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AssetService } from './asset.service';
import { AssetRequest, convertAssetRequest } from './asset.dto';

@Controller('asset')
@UseGuards(AuthGuard('jwt'))
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get('for-project/:id')
  async getAssetsForProject(@Param() params: { id: string }) {
    return await this.assetService.getAssetsForProject(Number(params.id));
  }
  @Get(':id')
  async getAssetById(@Param() params: { id: string }) {
    return await this.assetService.getAssetById(Number(params.id));
  }
  @Post()
  async CreateAsset(@Body('asset') asset: AssetRequest) {
    const assetEntity = convertAssetRequest(asset);
    return await this.assetService.createAsset(assetEntity);
  }
  @Put(':id')
  async updateAsset(
    @Param() params: { id: string },
    @Body('asset') asset: AssetRequest,
  ) {
    return await this.assetService.updateAsset(Number(params.id), asset);
  }
}
