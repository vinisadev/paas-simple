-- CreateEnum
CREATE TYPE "ContainerStatus" AS ENUM ('PENDING', 'RUNNING', 'STOPPED', 'FAILED');

-- CreateTable
CREATE TABLE "Container" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" "ContainerStatus" NOT NULL DEFAULT 'PENDING',
    "port" INTEGER,
    "environmentVariables" JSONB DEFAULT '{}',
    "logs" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dockerId" TEXT,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Container_dockerId_key" ON "Container"("dockerId");

-- CreateIndex
CREATE INDEX "Container_userId_idx" ON "Container"("userId");

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
