/*
  Warnings:

  - Added the required column `assetId` to the `LevelTileLayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetX` to the `LevelTileLayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetY` to the `LevelTileLayer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LevelTileLayer" ADD COLUMN     "assetId" INTEGER NOT NULL,
ADD COLUMN     "assetX" INTEGER NOT NULL,
ADD COLUMN     "assetY" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LevelTileLayer" ADD CONSTRAINT "LevelTileLayer_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
