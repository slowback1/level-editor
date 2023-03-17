-- CreateTable
CREATE TABLE "LayerType" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "LayerType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LayerType" ADD CONSTRAINT "LayerType_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
