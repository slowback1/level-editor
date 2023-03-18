-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LevelTile" (
    "id" SERIAL NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,

    CONSTRAINT "LevelTile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LevelTileLayer" (
    "id" SERIAL NOT NULL,
    "levelTileId" INTEGER NOT NULL,
    "layerTypeId" INTEGER NOT NULL,

    CONSTRAINT "LevelTileLayer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevelTile" ADD CONSTRAINT "LevelTile_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevelTileLayer" ADD CONSTRAINT "LevelTileLayer_levelTileId_fkey" FOREIGN KEY ("levelTileId") REFERENCES "LevelTile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevelTileLayer" ADD CONSTRAINT "LevelTileLayer_layerTypeId_fkey" FOREIGN KEY ("layerTypeId") REFERENCES "LayerType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
