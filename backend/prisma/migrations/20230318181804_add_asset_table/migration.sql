-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "itemWidth" INTEGER NOT NULL,
    "itemHeight" INTEGER NOT NULL,
    "itemSpacing" INTEGER NOT NULL,
    "totalWidth" INTEGER NOT NULL,
    "totalHeight" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
