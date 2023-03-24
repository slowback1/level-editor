import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { ProjectService } from './modules/project/project.service';
import { PrismaService } from './modules/shared/prisma.service';
import { ProjectController } from './modules/project/project.controller';
import { LayerTypeService } from './modules/layerType/layerType.service';
import { LayerTypeController } from './modules/layerType/layerType.controller';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AssetService } from './modules/asset/asset.service';
import { AssetController } from './modules/asset/asset.controller';
import { LevelController } from './modules/level/level.controller';
import { LevelService } from './modules/level/level.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProjectController,
    LayerTypeController,
    UserController,
    AssetController,
    LevelController,
  ],
  providers: [
    AppService,
    ProjectService,
    PrismaService,
    LayerTypeService,
    UserService,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    JwtService,
    AssetService,
    LevelService,
  ],
})
export class AppModule {}
