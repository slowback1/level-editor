import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelRequest } from './level.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('level')
@UseGuards(AuthGuard('jwt'))
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get('project/:id')
  async getLevelByProjectId(@Param() params: { id: string }) {
    return await this.levelService.getAllForProject(Number(params.id));
  }
  @Get(':id')
  async getLevelById(@Param() params: { id: string }) {
    return await this.levelService.getById(Number(params.id));
  }
  @Post()
  async createLevel(
    @Body('level')
    level: LevelRequest,
  ) {
    return await this.levelService.create(level);
  }
  @Put(':id')
  async updateLevel(
    @Param() params: { id: string },
    @Body('level')
    level: LevelRequest,
  ) {
    return await this.levelService.update(level);
  }

  @Get('export/:id')
  async exportLevel(@Param() params: { id: string }) {
    return await this.levelService.exportLevel(Number(params.id));
  }
}
