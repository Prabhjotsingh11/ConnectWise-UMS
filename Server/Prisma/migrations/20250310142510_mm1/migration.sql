/*
  Warnings:

  - You are about to drop the column `Rating` on the `GigWorkers` table. All the data in the column will be lost.
  - You are about to drop the `Accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_AccUserId_fkey";

-- AlterTable
ALTER TABLE "GigWorkers" DROP COLUMN "Rating";

-- DropTable
DROP TABLE "Accounts";

-- CreateTable
CREATE TABLE "Review" (
    "Review_id" TEXT NOT NULL,
    "Avg_rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "GigWorkerId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("Review_id")
);

-- CreateTable
CREATE TABLE "ReviewDetail" (
    "Detail_id" TEXT NOT NULL,
    "Review_id" TEXT NOT NULL,
    "ResidentId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewDetail_pkey" PRIMARY KEY ("Detail_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_GigWorkerId_key" ON "Review"("GigWorkerId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_GigWorkerId_fkey" FOREIGN KEY ("GigWorkerId") REFERENCES "GigWorkers"("WorkerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewDetail" ADD CONSTRAINT "ReviewDetail_ResidentId_fkey" FOREIGN KEY ("ResidentId") REFERENCES "Resident"("ResidentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewDetail" ADD CONSTRAINT "ReviewDetail_Review_id_fkey" FOREIGN KEY ("Review_id") REFERENCES "Review"("Review_id") ON DELETE RESTRICT ON UPDATE CASCADE;
